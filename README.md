# 書籍レビューアプリ

> **Note**<br>
> API は[TechTrain](https://techbowl.co.jp/techtrain)で用意されたものを用い、フロント部分のみ実装をしました。<br>
<br>
> 読んだ書籍のレビューを投稿できます。<br>
> ログイン、投稿の更新・削除、ユーザー情報の更新が行えます。<br>
> cookie でトークン管理を行い、認証状態によってリダイレクトします。<br>
> [プロダクトのリンクはこちら](https://books-review.vercel.app/signin)

![Desktop](https://user-images.githubusercontent.com/97160510/172779226-f06d3308-6459-4767-a9c6-afdcd7b67764.jpg)

### ↑デモ画面

<img src="https://user-images.githubusercontent.com/97160510/172785396-79ed611f-f5f0-4d17-976b-ba139e3b0427.jpg" width="300px">         <img src="https://user-images.githubusercontent.com/97160510/172779392-01d4d160-77dd-4256-8f70-c782def00ee5.png" width="280px">

### ↑ スマホ画面(iPhone11 & iPhoneSE2)

## 使用技術

- JavaScript
- React 18.1.0
- Next.js 12.1.6
  - autoprefixer 10.4.7
  - react-dom 18.1.0
- Mantine 4.2.7
  - mantine/core 4.2.6
  - mantine/form 4.2.6
  - mantine/hooks 4.2.6
  - mantine/next 4.2.6
  - mantine/notifications 4.2.7
- tailwindcss 3.0.24
  - postcss 8.4.14
- eslint 8.16.0
  - eslint-config-next 12.1.6
- eslint-plugin-tailwindcss 3.5.0
- zod 3.17.3
- react-cookie 4.1.1
- prop-types 15.8.1
- tabler-icons-react 1.48.0
- [TectTrain Railway MISSION(API)](https://app.swaggerhub.com/apis-docs/Takumaron/TechTrain-RailwayMission/1.0.0#/)

## 機能一覧

- ユーザーの新規登録、ログイン/ログアウト
  - バリデーション
  - cookieでトークン管理
    - 認証状態によってリダイレクト
- レビュー投稿、編集、削除
- ユーザー情報編集
