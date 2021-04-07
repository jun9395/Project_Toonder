import json
import warnings
from numpy import dot
from numpy.linalg import norm
import numpy as np
import pandas as pd
from eunjeon import Mecab
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

from webtoons.serializers import GenreSerializer

# from recommends.models import Webtoon

warnings.filterwarnings('ignore')

# 유저 매트릭스 생성
def user_to_matrix(data):
  print("유저 매트릭스")
  user_matrix = [0] * 20
  for webtoon in data:
    for u in webtoon['genres']:
      if user_matrix[u-1] <= 1:
        user_matrix[u-1] += 0.1
  # print(user_matrix)      
  return user_matrix


# 웹툰 장르 매트릭스 데이터프레임화
def webtoon_to_dataframe(data):
  ls_webtoon = []
  for i in range(len(data)):
    title = data[i].webtoon_name
    
    # serializer = GenreSerializer(data[i].genres.all(), many=True)
    
    # genres = serializer.data
    genres = data[i].genres.all().values('genre_name')
    # genres = data[i].genres.all().values_list('id', flat=True)
    # print(genres)
    # genre_ls = [g['genre_name'] for g in genres]
    
    # ls_webtoon.append([title, (' ').join(genres)])
    # ls_webtoon.append([title, np.array(genre_ls).tostring()])
    ls_webtoon.append([title, genres])
    
  df_webtoon = pd.DataFrame(ls_webtoon, columns=['title', 'genres'])
  # print(df_webtoon)
  return df_webtoon


# 웹툰의 장르 벡터화
def webtoon_to_matrix(df_webtoon):
  # print(df_webtoon['genres'])

  # print(df_webtoon['s3'])
  df_webtoon['genres_literal'] = df_webtoon['genres'].apply(lambda x : (' ').join([g['genre_name'] for g in x]))
  # print(df_webtoon)
  # df_webtoon.to_csv('genres.csv')
  # df_webtoon['genres_literal'] = df_webtoon['genres'].apply(lambda x : (' ').join(x))
  count_vect = CountVectorizer(min_df=0, ngram_range=(1,1)) #min_df: 단어장에 들어갈 최소빈도, ngram_range: 1 <= n <= 2
  genre_mat = count_vect.fit_transform(df_webtoon['genres_literal'])
  # genre_mat = count_vect.fit_transform(df_webtoon['genres'])
  return genre_mat.toarray()


# 유사도 계산
def cos_sim(A, B):
  return dot(A, B)/(norm(A)*norm(B))


# 유저와 각각의 웹툰 유사도 계산
def cal_similarity(user_mat, genre_mat):
  similarity_ls = {}
  for i in range(len(genre_mat)):
    genre_sim = cos_sim(user_mat, genre_mat[i])
    similarity_ls[i] = genre_sim
  return similarity_ls