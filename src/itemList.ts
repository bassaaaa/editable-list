import { v4 as uuidv4 } from "uuid";
import { Item } from "./types";

const list: string[] = [
  "SQLのデータソースが正しい",
  "SQLの抽出条件が正しい",
  "作成したデータソースが全て計算で使用されている",
  "最終的な抽出数に重複がない",
  "最終的な抽出データに、user_idが不正なデータが含まれていない (NULL、桁違いのデータなど)",
  "SQLの実行結果と作成したデータソースのレコード件数が一致している",
  "リストをまたいだ重複がない",
  "指定通りの件数が抽出されている",
];

export const externalItemList: Item[] = [];

list.forEach((item) => {
  externalItemList.push({
    id: uuidv4(),
    text: item,
  });
});
