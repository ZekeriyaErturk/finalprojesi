export class Post {
  key: string;
  baslik: string;
  altbaslik: string;
  icerik: string;
  likes: number = 0;
  yorum: number = 0;
  kayTarih: string;
  duzTarih: string;
  uid: string;
  imgUrl: string;
  uye?: string;
}
