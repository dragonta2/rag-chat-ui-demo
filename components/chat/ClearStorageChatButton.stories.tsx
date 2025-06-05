// components/chat/ClearStorageChatButton.stories.tsx

// Meta: Storybookに、コンポーネント情報を伝えるための「メタデータ型」
// StoryObj: 1個1個の Story（表示パターン）の型定義に使う
import type { Meta, StoryObj } from "@storybook/react";
import { ClearStorageChatButton } from "./ClearStorageChatButton";

// metaデータ（Storybookに登録する情報） Meta<typeof ClearStorageChatButton> と書くことで、対象コンポーネントから型を推論してくれる。超重要！
const meta: Meta<typeof ClearStorageChatButton> = {

  // title: Storybook上の表示カテゴリ（フォルダ名/階層になる）
  title: "Chat/ClearStorageChatButton",

  // component: 対象のReactコンポーネント
  component: ClearStorageChatButton,

  // tags: ["autodocs"] を入れると、Docsタブが自動生成される（v7以降）
  tags: ["autodocs"],
};

// Storybookにこのmetaを登録、export default じゃないと Storybook に認識ない
export default meta;

// Storyの型定義｜これで Story 型を作って再利用できる
// args に何を渡せばいいか補完が効くようになる！便利！
type Story = StoryObj<typeof ClearStorageChatButton>;

// Default: Storyの名前 → Storybook上でこの名前で表示される
// args: ClearStorageChatButton に props を渡す
export const Default: Story = {
  args: {
    onClear: () => alert("削除ロジック発火！（ダミー）"),
  },
};
