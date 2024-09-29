This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



finance-tracker-main
├─ .gitignore
├─ .hintrc
├─ middleware
│  ├─ auth.ts
│  └─ login.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ pages
│  └─ api
│     ├─ auth
│     │  ├─ login.ts
│     │  ├─ logout.ts
│     │  ├─ profile.ts
│     │  ├─ register.ts
│     │  └─ [...nextauth].ts
│     ├─ sendEmail.ts
│     └─ transactions
│        └─ [id].ts
├─ public
│  ├─ logo.png
│  ├─ map.png
│  ├─ menu_btn.png
│  ├─ slide1.jpg
│  ├─ slide2.jpg
│  ├─ slide3.jpg
│  └─ transaction-list.png
├─ README.md
├─ src
│  ├─ app
│  │  ├─ client-layout.tsx
│  │  ├─ components
│  │  │  ├─ AuthStatus.tsx
│  │  │  ├─ CallToActionButton.tsx
│  │  │  ├─ Carousel.tsx
│  │  │  ├─ Chart.tsx
│  │  │  ├─ css
│  │  │  │  ├─ Carousel.module.css
│  │  │  │  ├─ Chart.module.css
│  │  │  │  ├─ CTA.module.css
│  │  │  │  ├─ Dashboard.module.css
│  │  │  │  ├─ Educational.module.css
│  │  │  │  ├─ FeaturesSection.module.css
│  │  │  │  ├─ Footer.module.css
│  │  │  │  ├─ HowItWorks.module.css
│  │  │  │  ├─ Navbar.module.css
│  │  │  │  └─ TransactionForm.module.css
│  │  │  ├─ Dashboard.tsx
│  │  │  ├─ Educational.tsx
│  │  │  ├─ FeaturesSection.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ HowItWorks.tsx
│  │  │  ├─ Navbar.tsx
│  │  │  └─ TransactionForm.tsx
│  │  ├─ globals.css
│  │  ├─ Home.module.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ pages
│  │     ├─ about
│  │     │  ├─ About.module.css
│  │     │  └─ page.tsx
│  │     ├─ contact
│  │     │  ├─ Contact.module.css
│  │     │  └─ page.tsx
│  │     ├─ login
│  │     │  ├─ Login.Module.css
│  │     │  └─ page.tsx
│  │     ├─ profile
│  │     │  ├─ page.tsx
│  │     │  └─ Profile.module.css
│  │     └─ register
│  │        ├─ page.tsx
│  │        └─ Register.module.css
│  ├─ context
│  │  └─ AuthContext.tsx
│  └─ lib
│     ├─ auth.ts
│     ├─ mongodb.ts
│     └─ types.ts
├─ tsconfig.json
└─ types
   └─ next-auth.d.ts
```
finance-tracker-main
├─ .eslintrc.json
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        ├─ finance-tracker
│  │        │  └─ main
│  │        └─ origin
│  │           └─ main
│  ├─ objects
│  │  ├─ 03
│  │  │  └─ 51702dbd42fdd2d6861577e801d7adf131f2ae
│  │  ├─ 04
│  │  │  └─ 64c30f4e540febb986c3fb03f2b8c66355fae8
│  │  ├─ 0e
│  │  │  └─ bb6a69ced1219c4e3e06ce6e325be58bb2150d
│  │  ├─ 0f
│  │  │  └─ 537905e180d4c2ab7572dae96724ae38396cf8
│  │  ├─ 12
│  │  │  └─ 13fd11d94ff46b22d5ff836a6d6868e49dc2d5
│  │  ├─ 18
│  │  │  ├─ 3e3d98ad8dbbcb53e707e623798ad6a05dc9e1
│  │  │  └─ 70ae70dbd6134df1c712215744fe1ee376a92e
│  │  ├─ 1b
│  │  │  ├─ 90d8eea170bb26021b7a81f03b0fe0198e362e
│  │  │  └─ f8689454327a4253f3bf300e05a2ee628abaf1
│  │  ├─ 1c
│  │  │  └─ 2271d5cfa50e599fda9dcdf6023ec391da444b
│  │  ├─ 1d
│  │  │  └─ 4504066787ccf0779e0029aa4a757ab39c2154
│  │  ├─ 28
│  │  │  ├─ 08aa0f3d1e30d8e1d7c1e5b2a437f7f51dfd47
│  │  │  ├─ 102fa65c25a99c1b0c688db4b68785a8830336
│  │  │  └─ 71484d65bf42bebb555761f4588b33dd053189
│  │  ├─ 29
│  │  │  └─ d43c0e9b4af683a039671c4459ad7b2a91cceb
│  │  ├─ 2c
│  │  │  └─ 24d551c936cf3587abcfe5eb76388c59365eb9
│  │  ├─ 34
│  │  │  └─ 170f0de8165ec32508d3f7c087e986ee234d81
│  │  ├─ 38
│  │  │  └─ 1db81a0671efb2b6a0ff88eefdf24765f4812c
│  │  ├─ 3f
│  │  │  └─ 330eb0d5369c2e12ea2f7465584a14cbf27e89
│  │  ├─ 50
│  │  │  ├─ 35b38269bf4c1c8804346f9e5fa2d8f2b10ba8
│  │  │  └─ b1aa1c74691d58d3abbb6206142d451c7fccb4
│  │  ├─ 53
│  │  │  └─ 08672a8197874e1b12c844d16bb0d714de9d5c
│  │  ├─ 55
│  │  │  └─ 7bff7768a31135e610efcf9e96b296fa50c7fa
│  │  ├─ 58
│  │  │  ├─ 201ebea70a30cddde43b4c73aee768a1093a22
│  │  │  └─ 5ff6d70e3e5cca220fa505dd9f792b25eefe7a
│  │  ├─ 5a
│  │  │  └─ 85a4d972dcb921f4914f519cf20733dd70ea88
│  │  ├─ 5e
│  │  │  └─ d854d6024cbdd4b7c845a9c3836f9f3b5b6c14
│  │  ├─ 5f
│  │  │  └─ dcdfac8359bf9d47590f2f2bca4750815fd2c4
│  │  ├─ 61
│  │  │  ├─ 1d66ff435635bf1f5ebdd06bd367b433cf4526
│  │  │  └─ fcc6fde13e281b9a34d0634379b9ed85619494
│  │  ├─ 65
│  │  │  └─ df7f10d914e2f625610b13c0d08beb8155e6b8
│  │  ├─ 6a
│  │  │  └─ 7578a44be4cfa350932b965154c445e9c7a135
│  │  ├─ 6b
│  │  │  └─ c96f0b77527dd2a68ab5c55058261a87f3bb5c
│  │  ├─ 6e
│  │  │  └─ d1ccb524e1998be8ddb48b25aae584bfb9f050
│  │  ├─ 75
│  │  │  └─ 3fd4955b0b8dd6e1944d4bbd13477e5febeb35
│  │  ├─ 78
│  │  │  └─ 690e695e7d5ebb5ff93cabaf9720632cb56a6f
│  │  ├─ 86
│  │  │  └─ aca2c764116cb8ce70ed328d772a39dbb88d82
│  │  ├─ 89
│  │  │  └─ b1e008aab4ea432aee6a2f7cc6cd5a21319708
│  │  ├─ 8c
│  │  │  └─ c8a706d12ab787d61044f75ee740bdf4614079
│  │  ├─ 8f
│  │  │  └─ 1021c52464f5f5e457fce54d82cbb7040746c3
│  │  ├─ 90
│  │  │  └─ 49d9fa176ebf8a4c71b92e1d662bffec23d03d
│  │  ├─ 95
│  │  │  ├─ 72c733edd243e69db24a963ccb4e51f2b0474b
│  │  │  └─ decb790e7dfc1cfd62975d785cd51c00656a22
│  │  ├─ 99
│  │  │  └─ bd3af345cd552e992117473b0597a44e658e29
│  │  ├─ 9c
│  │  │  └─ 6211562cdfd7ea2edc5aba1037a71f2bca970b
│  │  ├─ a5
│  │  │  └─ 5f6d4d5c202c899994cc0f0bfd705f4be450cb
│  │  ├─ ad
│  │  │  └─ b2f7791baeb55a92d038dba9b925bd2bfc13e4
│  │  ├─ b0
│  │  │  └─ 274acc934a422326167cd499cedfcecfb8626b
│  │  ├─ b3
│  │  │  └─ 3dfa75201e6b0c663b81c4fa6032afbb3ee5cf
│  │  ├─ bd
│  │  │  ├─ a19299129b7825a5072fb9e605b88830075b1f
│  │  │  └─ dd2a66dac0356ed99d05d74a489508765c19a8
│  │  ├─ c2
│  │  │  └─ 2edf659ffa8b1cbc006d68e2dff9761a8956da
│  │  ├─ cb
│  │  │  └─ d8a4627b9c249f133b0147a4167bdbce4f307d
│  │  ├─ cc
│  │  │  └─ c669864fb3d3861797ebf0c3d196df1306e8b3
│  │  ├─ d0
│  │  │  ├─ a5c994bf1152d310d973b2a295f8f9cbba5baa
│  │  │  └─ d57a4806d0f1fcb4b5a425c6f85219623b7821
│  │  ├─ d1
│  │  │  └─ 5f217415c625cc683ede255e243845c9ea7500
│  │  ├─ d3
│  │  │  └─ 429587397abb52e64b290384292f3a6100aadc
│  │  ├─ d5
│  │  │  └─ 47f83c537100098aade81a8a8db920805e9884
│  │  ├─ da
│  │  │  ├─ 81b29556338070a1a5795425e5f40f250c2443
│  │  │  ├─ 854ad5e4328335a6372de939a24f9efd7210e4
│  │  │  ├─ e6303a7d30e6e654f7c0bb94be3de078cc372a
│  │  │  └─ f422ad475c0a73eb00535543603df1a9fba431
│  │  ├─ de
│  │  │  └─ 7037075546931852b5ffe723af61b5e6df5039
│  │  ├─ e6
│  │  │  └─ caf64507cbe30396a7645c79d22573fcde149f
│  │  ├─ ed
│  │  │  └─ 65d429f66e87dc2c04f13f32894b3573f3742f
│  │  ├─ f0
│  │  │  └─ d2667d1b80be0d3dc1cc7d6b8300c4f1d6e270
│  │  ├─ f1
│  │  │  └─ 62cffe8abf276fafc2db42080bc713986cb8f1
│  │  ├─ f3
│  │  │  └─ e30f774994ae41de3f659d8ba48a85b30c26a1
│  │  ├─ f5
│  │  │  └─ db3ef97b13aa16f9bea2c36d13073598bc15b8
│  │  ├─ f6
│  │  │  └─ 937c6b89e87a7eacc5108858ffcdfd10288c5b
│  │  ├─ f7
│  │  │  └─ e062c1fd3685cc7d0795ef8debc613627c1332
│  │  ├─ ff
│  │  │  └─ dd8a419a5dc9d55b711e8ea955db15a0d46d96
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-f7941bfaf915e23118e311b7538d8f0cdffd6c2a.idx
│  │     └─ pack-f7941bfaf915e23118e311b7538d8f0cdffd6c2a.pack
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  ├─ finance-tracker
│     │  │  └─ main
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ .hintrc
├─ middleware
│  ├─ auth.ts
│  └─ login.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ pages
│  └─ api
│     ├─ auth
│     │  ├─ login.ts
│     │  ├─ profile.ts
│     │  ├─ register.ts
│     │  ├─ yourApiRoute.ts
│     │  └─ [...nextauth].ts
│     ├─ sendEmail.ts
│     └─ transactions
│        ├─ expenses.ts
│        └─ [id].ts
├─ public
│  ├─ logo.png
│  ├─ map.png
│  ├─ menu_btn.png
│  ├─ slide1.jpg
│  ├─ slide2.jpg
│  ├─ slide3.jpg
│  └─ transaction-list.png
├─ README.md
├─ src
│  ├─ app
│  │  ├─ client-layout.tsx
│  │  ├─ components
│  │  │  ├─ AuthStatus.tsx
│  │  │  ├─ CallToActionButton.tsx
│  │  │  ├─ Carousel.tsx
│  │  │  ├─ Chart.tsx
│  │  │  ├─ css
│  │  │  │  ├─ Carousel.module.css
│  │  │  │  ├─ Chart.module.css
│  │  │  │  ├─ CTA.module.css
│  │  │  │  ├─ Dashboard.module.css
│  │  │  │  ├─ Educational.module.css
│  │  │  │  ├─ FeaturesSection.module.css
│  │  │  │  ├─ Footer.module.css
│  │  │  │  ├─ HowItWorks.module.css
│  │  │  │  ├─ Navbar.module.css
│  │  │  │  └─ TransactionForm.module.css
│  │  │  ├─ Educational.tsx
│  │  │  ├─ FeaturesSection.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ HowItWorks.tsx
│  │  │  ├─ Navbar.tsx
│  │  │  └─ TransactionForm.tsx
│  │  ├─ globals.css
│  │  ├─ Home.module.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ pages
│  │     ├─ about
│  │     │  ├─ About.module.css
│  │     │  └─ page.tsx
│  │     ├─ contact
│  │     │  ├─ Contact.module.css
│  │     │  └─ page.tsx
│  │     ├─ login
│  │     │  ├─ Login.Module.css
│  │     │  └─ page.tsx
│  │     ├─ profile
│  │     │  ├─ page.tsx
│  │     │  └─ Profile.module.css
│  │     └─ register
│  │        ├─ page.tsx
│  │        └─ Register.module.css
│  ├─ context
│  │  └─ AuthContext.tsx
│  ├─ lib
│  │  ├─ auth.ts
│  │  ├─ mongodb.ts
│  │  └─ types.ts
│  └─ models
│     └─ Expense.ts
├─ tsconfig.json
└─ types
   └─ next-auth.d.ts

```
```
finance-tracker-main
├─ .eslintrc.json
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        ├─ finance-tracker
│  │        │  └─ main
│  │        └─ origin
│  │           └─ main
│  ├─ objects
│  │  ├─ 03
│  │  │  └─ 51702dbd42fdd2d6861577e801d7adf131f2ae
│  │  ├─ 04
│  │  │  └─ 64c30f4e540febb986c3fb03f2b8c66355fae8
│  │  ├─ 0e
│  │  │  └─ bb6a69ced1219c4e3e06ce6e325be58bb2150d
│  │  ├─ 0f
│  │  │  └─ 537905e180d4c2ab7572dae96724ae38396cf8
│  │  ├─ 12
│  │  │  └─ 13fd11d94ff46b22d5ff836a6d6868e49dc2d5
│  │  ├─ 18
│  │  │  ├─ 3e3d98ad8dbbcb53e707e623798ad6a05dc9e1
│  │  │  └─ 70ae70dbd6134df1c712215744fe1ee376a92e
│  │  ├─ 1b
│  │  │  ├─ 90d8eea170bb26021b7a81f03b0fe0198e362e
│  │  │  └─ f8689454327a4253f3bf300e05a2ee628abaf1
│  │  ├─ 1c
│  │  │  └─ 2271d5cfa50e599fda9dcdf6023ec391da444b
│  │  ├─ 1d
│  │  │  └─ 4504066787ccf0779e0029aa4a757ab39c2154
│  │  ├─ 28
│  │  │  ├─ 08aa0f3d1e30d8e1d7c1e5b2a437f7f51dfd47
│  │  │  ├─ 102fa65c25a99c1b0c688db4b68785a8830336
│  │  │  └─ 71484d65bf42bebb555761f4588b33dd053189
│  │  ├─ 29
│  │  │  └─ d43c0e9b4af683a039671c4459ad7b2a91cceb
│  │  ├─ 2c
│  │  │  └─ 24d551c936cf3587abcfe5eb76388c59365eb9
│  │  ├─ 34
│  │  │  └─ 170f0de8165ec32508d3f7c087e986ee234d81
│  │  ├─ 38
│  │  │  └─ 1db81a0671efb2b6a0ff88eefdf24765f4812c
│  │  ├─ 3f
│  │  │  └─ 330eb0d5369c2e12ea2f7465584a14cbf27e89
│  │  ├─ 50
│  │  │  ├─ 35b38269bf4c1c8804346f9e5fa2d8f2b10ba8
│  │  │  └─ b1aa1c74691d58d3abbb6206142d451c7fccb4
│  │  ├─ 53
│  │  │  └─ 08672a8197874e1b12c844d16bb0d714de9d5c
│  │  ├─ 55
│  │  │  └─ 7bff7768a31135e610efcf9e96b296fa50c7fa
│  │  ├─ 58
│  │  │  ├─ 201ebea70a30cddde43b4c73aee768a1093a22
│  │  │  └─ 5ff6d70e3e5cca220fa505dd9f792b25eefe7a
│  │  ├─ 5a
│  │  │  └─ 85a4d972dcb921f4914f519cf20733dd70ea88
│  │  ├─ 5e
│  │  │  └─ d854d6024cbdd4b7c845a9c3836f9f3b5b6c14
│  │  ├─ 5f
│  │  │  └─ dcdfac8359bf9d47590f2f2bca4750815fd2c4
│  │  ├─ 61
│  │  │  ├─ 1d66ff435635bf1f5ebdd06bd367b433cf4526
│  │  │  └─ fcc6fde13e281b9a34d0634379b9ed85619494
│  │  ├─ 65
│  │  │  └─ df7f10d914e2f625610b13c0d08beb8155e6b8
│  │  ├─ 6a
│  │  │  └─ 7578a44be4cfa350932b965154c445e9c7a135
│  │  ├─ 6b
│  │  │  └─ c96f0b77527dd2a68ab5c55058261a87f3bb5c
│  │  ├─ 6e
│  │  │  └─ d1ccb524e1998be8ddb48b25aae584bfb9f050
│  │  ├─ 75
│  │  │  └─ 3fd4955b0b8dd6e1944d4bbd13477e5febeb35
│  │  ├─ 78
│  │  │  └─ 690e695e7d5ebb5ff93cabaf9720632cb56a6f
│  │  ├─ 86
│  │  │  └─ aca2c764116cb8ce70ed328d772a39dbb88d82
│  │  ├─ 89
│  │  │  └─ b1e008aab4ea432aee6a2f7cc6cd5a21319708
│  │  ├─ 8c
│  │  │  └─ c8a706d12ab787d61044f75ee740bdf4614079
│  │  ├─ 8f
│  │  │  └─ 1021c52464f5f5e457fce54d82cbb7040746c3
│  │  ├─ 90
│  │  │  └─ 49d9fa176ebf8a4c71b92e1d662bffec23d03d
│  │  ├─ 95
│  │  │  ├─ 72c733edd243e69db24a963ccb4e51f2b0474b
│  │  │  └─ decb790e7dfc1cfd62975d785cd51c00656a22
│  │  ├─ 99
│  │  │  └─ bd3af345cd552e992117473b0597a44e658e29
│  │  ├─ 9c
│  │  │  └─ 6211562cdfd7ea2edc5aba1037a71f2bca970b
│  │  ├─ a5
│  │  │  └─ 5f6d4d5c202c899994cc0f0bfd705f4be450cb
│  │  ├─ ad
│  │  │  └─ b2f7791baeb55a92d038dba9b925bd2bfc13e4
│  │  ├─ b0
│  │  │  └─ 274acc934a422326167cd499cedfcecfb8626b
│  │  ├─ b3
│  │  │  └─ 3dfa75201e6b0c663b81c4fa6032afbb3ee5cf
│  │  ├─ bd
│  │  │  ├─ a19299129b7825a5072fb9e605b88830075b1f
│  │  │  └─ dd2a66dac0356ed99d05d74a489508765c19a8
│  │  ├─ c2
│  │  │  └─ 2edf659ffa8b1cbc006d68e2dff9761a8956da
│  │  ├─ cb
│  │  │  └─ d8a4627b9c249f133b0147a4167bdbce4f307d
│  │  ├─ cc
│  │  │  └─ c669864fb3d3861797ebf0c3d196df1306e8b3
│  │  ├─ d0
│  │  │  ├─ a5c994bf1152d310d973b2a295f8f9cbba5baa
│  │  │  └─ d57a4806d0f1fcb4b5a425c6f85219623b7821
│  │  ├─ d1
│  │  │  └─ 5f217415c625cc683ede255e243845c9ea7500
│  │  ├─ d3
│  │  │  └─ 429587397abb52e64b290384292f3a6100aadc
│  │  ├─ d5
│  │  │  └─ 47f83c537100098aade81a8a8db920805e9884
│  │  ├─ da
│  │  │  ├─ 81b29556338070a1a5795425e5f40f250c2443
│  │  │  ├─ 854ad5e4328335a6372de939a24f9efd7210e4
│  │  │  ├─ e6303a7d30e6e654f7c0bb94be3de078cc372a
│  │  │  └─ f422ad475c0a73eb00535543603df1a9fba431
│  │  ├─ de
│  │  │  └─ 7037075546931852b5ffe723af61b5e6df5039
│  │  ├─ e6
│  │  │  └─ caf64507cbe30396a7645c79d22573fcde149f
│  │  ├─ ed
│  │  │  └─ 65d429f66e87dc2c04f13f32894b3573f3742f
│  │  ├─ f0
│  │  │  └─ d2667d1b80be0d3dc1cc7d6b8300c4f1d6e270
│  │  ├─ f1
│  │  │  └─ 62cffe8abf276fafc2db42080bc713986cb8f1
│  │  ├─ f3
│  │  │  └─ e30f774994ae41de3f659d8ba48a85b30c26a1
│  │  ├─ f5
│  │  │  └─ db3ef97b13aa16f9bea2c36d13073598bc15b8
│  │  ├─ f6
│  │  │  └─ 937c6b89e87a7eacc5108858ffcdfd10288c5b
│  │  ├─ f7
│  │  │  └─ e062c1fd3685cc7d0795ef8debc613627c1332
│  │  ├─ ff
│  │  │  └─ dd8a419a5dc9d55b711e8ea955db15a0d46d96
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-f7941bfaf915e23118e311b7538d8f0cdffd6c2a.idx
│  │     └─ pack-f7941bfaf915e23118e311b7538d8f0cdffd6c2a.pack
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  ├─ finance-tracker
│     │  │  └─ main
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ .hintrc
├─ middleware
│  ├─ auth.ts
│  └─ login.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ pages
│  └─ api
│     ├─ auth
│     │  ├─ login.ts
│     │  ├─ profile.ts
│     │  ├─ register.ts
│     │  ├─ yourApiRoute.ts
│     │  └─ [...nextauth].ts
│     ├─ sendEmail.ts
│     ├─ transactions
│     │  ├─ expenses.ts
│     │  ├─ index.ts
│     │  └─ [id].ts
│     └─ users
│        └─ [userId].ts
├─ public
│  ├─ logo.png
│  ├─ map.png
│  ├─ menu_btn.png
│  ├─ slide1.jpg
│  ├─ slide2.jpg
│  ├─ slide3.jpg
│  └─ transaction-list.png
├─ README.md
├─ src
│  ├─ app
│  │  ├─ client-layout.tsx
│  │  ├─ components
│  │  │  ├─ AuthStatus.tsx
│  │  │  ├─ CallToActionButton.tsx
│  │  │  ├─ Carousel.tsx
│  │  │  ├─ Chart.tsx
│  │  │  ├─ css
│  │  │  │  ├─ Carousel.module.css
│  │  │  │  ├─ Chart.module.css
│  │  │  │  ├─ CTA.module.css
│  │  │  │  ├─ Dashboard.module.css
│  │  │  │  ├─ Educational.module.css
│  │  │  │  ├─ FeaturesSection.module.css
│  │  │  │  ├─ Footer.module.css
│  │  │  │  ├─ HowItWorks.module.css
│  │  │  │  ├─ Navbar.module.css
│  │  │  │  └─ TransactionForm.module.css
│  │  │  ├─ Educational.tsx
│  │  │  ├─ FeaturesSection.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ HowItWorks.tsx
│  │  │  ├─ Navbar.tsx
│  │  │  └─ TransactionForm.tsx
│  │  ├─ globals.css
│  │  ├─ Home.module.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ pages
│  │     ├─ about
│  │     │  ├─ About.module.css
│  │     │  └─ page.tsx
│  │     ├─ contact
│  │     │  ├─ Contact.module.css
│  │     │  └─ page.tsx
│  │     ├─ login
│  │     │  ├─ Login.Module.css
│  │     │  └─ page.tsx
│  │     ├─ profile
│  │     │  ├─ page.tsx
│  │     │  └─ Profile.module.css
│  │     └─ register
│  │        ├─ page.tsx
│  │        └─ Register.module.css
│  ├─ context
│  │  ├─ AuthContext.tsx
│  │  └─ UserContext.tsx
│  ├─ lib
│  │  ├─ auth.ts
│  │  ├─ mongodb.ts
│  │  └─ types.ts
│  └─ models
│     ├─ Expense.ts
│     └─ User.ts
├─ tsconfig.json
└─ types
   └─ next-auth.d.ts

```
```
finance-tracker-main
├─ .eslintrc.json
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        ├─ finance-tracker
│  │        │  └─ main
│  │        └─ origin
│  │           └─ main
│  ├─ objects
│  │  ├─ 03
│  │  │  └─ 51702dbd42fdd2d6861577e801d7adf131f2ae
│  │  ├─ 04
│  │  │  └─ 64c30f4e540febb986c3fb03f2b8c66355fae8
│  │  ├─ 0e
│  │  │  └─ bb6a69ced1219c4e3e06ce6e325be58bb2150d
│  │  ├─ 0f
│  │  │  └─ 537905e180d4c2ab7572dae96724ae38396cf8
│  │  ├─ 12
│  │  │  └─ 13fd11d94ff46b22d5ff836a6d6868e49dc2d5
│  │  ├─ 18
│  │  │  ├─ 3e3d98ad8dbbcb53e707e623798ad6a05dc9e1
│  │  │  └─ 70ae70dbd6134df1c712215744fe1ee376a92e
│  │  ├─ 1b
│  │  │  ├─ 90d8eea170bb26021b7a81f03b0fe0198e362e
│  │  │  └─ f8689454327a4253f3bf300e05a2ee628abaf1
│  │  ├─ 1c
│  │  │  └─ 2271d5cfa50e599fda9dcdf6023ec391da444b
│  │  ├─ 1d
│  │  │  └─ 4504066787ccf0779e0029aa4a757ab39c2154
│  │  ├─ 28
│  │  │  ├─ 08aa0f3d1e30d8e1d7c1e5b2a437f7f51dfd47
│  │  │  ├─ 102fa65c25a99c1b0c688db4b68785a8830336
│  │  │  └─ 71484d65bf42bebb555761f4588b33dd053189
│  │  ├─ 29
│  │  │  └─ d43c0e9b4af683a039671c4459ad7b2a91cceb
│  │  ├─ 2c
│  │  │  └─ 24d551c936cf3587abcfe5eb76388c59365eb9
│  │  ├─ 34
│  │  │  └─ 170f0de8165ec32508d3f7c087e986ee234d81
│  │  ├─ 38
│  │  │  └─ 1db81a0671efb2b6a0ff88eefdf24765f4812c
│  │  ├─ 3f
│  │  │  └─ 330eb0d5369c2e12ea2f7465584a14cbf27e89
│  │  ├─ 50
│  │  │  ├─ 35b38269bf4c1c8804346f9e5fa2d8f2b10ba8
│  │  │  └─ b1aa1c74691d58d3abbb6206142d451c7fccb4
│  │  ├─ 53
│  │  │  └─ 08672a8197874e1b12c844d16bb0d714de9d5c
│  │  ├─ 55
│  │  │  └─ 7bff7768a31135e610efcf9e96b296fa50c7fa
│  │  ├─ 58
│  │  │  ├─ 201ebea70a30cddde43b4c73aee768a1093a22
│  │  │  └─ 5ff6d70e3e5cca220fa505dd9f792b25eefe7a
│  │  ├─ 5a
│  │  │  └─ 85a4d972dcb921f4914f519cf20733dd70ea88
│  │  ├─ 5e
│  │  │  └─ d854d6024cbdd4b7c845a9c3836f9f3b5b6c14
│  │  ├─ 5f
│  │  │  └─ dcdfac8359bf9d47590f2f2bca4750815fd2c4
│  │  ├─ 61
│  │  │  ├─ 1d66ff435635bf1f5ebdd06bd367b433cf4526
│  │  │  └─ fcc6fde13e281b9a34d0634379b9ed85619494
│  │  ├─ 65
│  │  │  └─ df7f10d914e2f625610b13c0d08beb8155e6b8
│  │  ├─ 6a
│  │  │  └─ 7578a44be4cfa350932b965154c445e9c7a135
│  │  ├─ 6b
│  │  │  └─ c96f0b77527dd2a68ab5c55058261a87f3bb5c
│  │  ├─ 6e
│  │  │  └─ d1ccb524e1998be8ddb48b25aae584bfb9f050
│  │  ├─ 75
│  │  │  └─ 3fd4955b0b8dd6e1944d4bbd13477e5febeb35
│  │  ├─ 78
│  │  │  └─ 690e695e7d5ebb5ff93cabaf9720632cb56a6f
│  │  ├─ 86
│  │  │  └─ aca2c764116cb8ce70ed328d772a39dbb88d82
│  │  ├─ 89
│  │  │  └─ b1e008aab4ea432aee6a2f7cc6cd5a21319708
│  │  ├─ 8c
│  │  │  └─ c8a706d12ab787d61044f75ee740bdf4614079
│  │  ├─ 8f
│  │  │  └─ 1021c52464f5f5e457fce54d82cbb7040746c3
│  │  ├─ 90
│  │  │  └─ 49d9fa176ebf8a4c71b92e1d662bffec23d03d
│  │  ├─ 95
│  │  │  ├─ 72c733edd243e69db24a963ccb4e51f2b0474b
│  │  │  └─ decb790e7dfc1cfd62975d785cd51c00656a22
│  │  ├─ 99
│  │  │  └─ bd3af345cd552e992117473b0597a44e658e29
│  │  ├─ 9c
│  │  │  └─ 6211562cdfd7ea2edc5aba1037a71f2bca970b
│  │  ├─ a5
│  │  │  └─ 5f6d4d5c202c899994cc0f0bfd705f4be450cb
│  │  ├─ ad
│  │  │  └─ b2f7791baeb55a92d038dba9b925bd2bfc13e4
│  │  ├─ b0
│  │  │  └─ 274acc934a422326167cd499cedfcecfb8626b
│  │  ├─ b3
│  │  │  └─ 3dfa75201e6b0c663b81c4fa6032afbb3ee5cf
│  │  ├─ bd
│  │  │  ├─ a19299129b7825a5072fb9e605b88830075b1f
│  │  │  └─ dd2a66dac0356ed99d05d74a489508765c19a8
│  │  ├─ c2
│  │  │  └─ 2edf659ffa8b1cbc006d68e2dff9761a8956da
│  │  ├─ cb
│  │  │  └─ d8a4627b9c249f133b0147a4167bdbce4f307d
│  │  ├─ cc
│  │  │  └─ c669864fb3d3861797ebf0c3d196df1306e8b3
│  │  ├─ d0
│  │  │  ├─ a5c994bf1152d310d973b2a295f8f9cbba5baa
│  │  │  └─ d57a4806d0f1fcb4b5a425c6f85219623b7821
│  │  ├─ d1
│  │  │  └─ 5f217415c625cc683ede255e243845c9ea7500
│  │  ├─ d3
│  │  │  └─ 429587397abb52e64b290384292f3a6100aadc
│  │  ├─ d5
│  │  │  └─ 47f83c537100098aade81a8a8db920805e9884
│  │  ├─ da
│  │  │  ├─ 81b29556338070a1a5795425e5f40f250c2443
│  │  │  ├─ 854ad5e4328335a6372de939a24f9efd7210e4
│  │  │  ├─ e6303a7d30e6e654f7c0bb94be3de078cc372a
│  │  │  └─ f422ad475c0a73eb00535543603df1a9fba431
│  │  ├─ de
│  │  │  └─ 7037075546931852b5ffe723af61b5e6df5039
│  │  ├─ e6
│  │  │  └─ caf64507cbe30396a7645c79d22573fcde149f
│  │  ├─ ed
│  │  │  └─ 65d429f66e87dc2c04f13f32894b3573f3742f
│  │  ├─ f0
│  │  │  └─ d2667d1b80be0d3dc1cc7d6b8300c4f1d6e270
│  │  ├─ f1
│  │  │  └─ 62cffe8abf276fafc2db42080bc713986cb8f1
│  │  ├─ f3
│  │  │  └─ e30f774994ae41de3f659d8ba48a85b30c26a1
│  │  ├─ f5
│  │  │  └─ db3ef97b13aa16f9bea2c36d13073598bc15b8
│  │  ├─ f6
│  │  │  └─ 937c6b89e87a7eacc5108858ffcdfd10288c5b
│  │  ├─ f7
│  │  │  └─ e062c1fd3685cc7d0795ef8debc613627c1332
│  │  ├─ ff
│  │  │  └─ dd8a419a5dc9d55b711e8ea955db15a0d46d96
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-f7941bfaf915e23118e311b7538d8f0cdffd6c2a.idx
│  │     └─ pack-f7941bfaf915e23118e311b7538d8f0cdffd6c2a.pack
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  ├─ finance-tracker
│     │  │  └─ main
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ .hintrc
├─ middleware
│  ├─ auth.ts
│  └─ login.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ pages
│  └─ api
│     ├─ auth
│     │  ├─ login.ts
│     │  ├─ profile.ts
│     │  ├─ register.ts
│     │  ├─ yourApiRoute.ts
│     │  └─ [...nextauth].ts
│     ├─ sendEmail.ts
│     ├─ transactions
│     │  ├─ expenses.ts
│     │  ├─ index.ts
│     │  └─ [transactionId].ts
│     └─ users
│        └─ [userId].ts
├─ public
│  ├─ logo.png
│  ├─ map.png
│  ├─ menu_btn.png
│  ├─ slide1.jpg
│  ├─ slide2.jpg
│  ├─ slide3.jpg
│  └─ transaction-list.png
├─ README.md
├─ src
│  ├─ app
│  │  ├─ client-layout.tsx
│  │  ├─ components
│  │  │  ├─ AuthStatus.tsx
│  │  │  ├─ CallToActionButton.tsx
│  │  │  ├─ Carousel.tsx
│  │  │  ├─ Chart.tsx
│  │  │  ├─ css
│  │  │  │  ├─ Carousel.module.css
│  │  │  │  ├─ Chart.module.css
│  │  │  │  ├─ CTA.module.css
│  │  │  │  ├─ Dashboard.module.css
│  │  │  │  ├─ Educational.module.css
│  │  │  │  ├─ FeaturesSection.module.css
│  │  │  │  ├─ Footer.module.css
│  │  │  │  ├─ HowItWorks.module.css
│  │  │  │  ├─ Navbar.module.css
│  │  │  │  └─ TransactionForm.module.css
│  │  │  ├─ Educational.tsx
│  │  │  ├─ FeaturesSection.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ HowItWorks.tsx
│  │  │  ├─ Navbar.tsx
│  │  │  └─ TransactionForm.tsx
│  │  ├─ globals.css
│  │  ├─ Home.module.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ pages
│  │     ├─ about
│  │     │  ├─ About.module.css
│  │     │  └─ page.tsx
│  │     ├─ contact
│  │     │  ├─ Contact.module.css
│  │     │  └─ page.tsx
│  │     ├─ login
│  │     │  ├─ Login.Module.css
│  │     │  └─ page.tsx
│  │     ├─ profile
│  │     │  ├─ page.tsx
│  │     │  └─ Profile.module.css
│  │     └─ register
│  │        ├─ page.tsx
│  │        └─ Register.module.css
│  ├─ context
│  │  ├─ AuthContext.tsx
│  │  └─ UserContext.tsx
│  ├─ lib
│  │  ├─ auth.ts
│  │  ├─ mongodb.ts
│  │  └─ types.ts
│  └─ models
│     ├─ Expense.ts
│     └─ User.ts
├─ tsconfig.json
└─ types
   └─ next-auth.d.ts

```
```
finance-tracker-main
├─ .eslintrc.json
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        ├─ finance-tracker
│  │        │  └─ main
│  │        └─ origin
│  │           └─ main
│  ├─ objects
│  │  ├─ 03
│  │  │  └─ 51702dbd42fdd2d6861577e801d7adf131f2ae
│  │  ├─ 04
│  │  │  └─ 64c30f4e540febb986c3fb03f2b8c66355fae8
│  │  ├─ 0e
│  │  │  └─ bb6a69ced1219c4e3e06ce6e325be58bb2150d
│  │  ├─ 0f
│  │  │  └─ 537905e180d4c2ab7572dae96724ae38396cf8
│  │  ├─ 12
│  │  │  └─ 13fd11d94ff46b22d5ff836a6d6868e49dc2d5
│  │  ├─ 18
│  │  │  ├─ 3e3d98ad8dbbcb53e707e623798ad6a05dc9e1
│  │  │  └─ 70ae70dbd6134df1c712215744fe1ee376a92e
│  │  ├─ 1b
│  │  │  ├─ 90d8eea170bb26021b7a81f03b0fe0198e362e
│  │  │  └─ f8689454327a4253f3bf300e05a2ee628abaf1
│  │  ├─ 1c
│  │  │  └─ 2271d5cfa50e599fda9dcdf6023ec391da444b
│  │  ├─ 1d
│  │  │  └─ 4504066787ccf0779e0029aa4a757ab39c2154
│  │  ├─ 28
│  │  │  ├─ 08aa0f3d1e30d8e1d7c1e5b2a437f7f51dfd47
│  │  │  ├─ 102fa65c25a99c1b0c688db4b68785a8830336
│  │  │  └─ 71484d65bf42bebb555761f4588b33dd053189
│  │  ├─ 29
│  │  │  └─ d43c0e9b4af683a039671c4459ad7b2a91cceb
│  │  ├─ 2c
│  │  │  └─ 24d551c936cf3587abcfe5eb76388c59365eb9
│  │  ├─ 34
│  │  │  └─ 170f0de8165ec32508d3f7c087e986ee234d81
│  │  ├─ 38
│  │  │  └─ 1db81a0671efb2b6a0ff88eefdf24765f4812c
│  │  ├─ 3f
│  │  │  └─ 330eb0d5369c2e12ea2f7465584a14cbf27e89
│  │  ├─ 50
│  │  │  ├─ 35b38269bf4c1c8804346f9e5fa2d8f2b10ba8
│  │  │  └─ b1aa1c74691d58d3abbb6206142d451c7fccb4
│  │  ├─ 53
│  │  │  └─ 08672a8197874e1b12c844d16bb0d714de9d5c
│  │  ├─ 55
│  │  │  └─ 7bff7768a31135e610efcf9e96b296fa50c7fa
│  │  ├─ 58
│  │  │  ├─ 201ebea70a30cddde43b4c73aee768a1093a22
│  │  │  └─ 5ff6d70e3e5cca220fa505dd9f792b25eefe7a
│  │  ├─ 5a
│  │  │  └─ 85a4d972dcb921f4914f519cf20733dd70ea88
│  │  ├─ 5e
│  │  │  └─ d854d6024cbdd4b7c845a9c3836f9f3b5b6c14
│  │  ├─ 5f
│  │  │  └─ dcdfac8359bf9d47590f2f2bca4750815fd2c4
│  │  ├─ 61
│  │  │  ├─ 1d66ff435635bf1f5ebdd06bd367b433cf4526
│  │  │  └─ fcc6fde13e281b9a34d0634379b9ed85619494
│  │  ├─ 65
│  │  │  └─ df7f10d914e2f625610b13c0d08beb8155e6b8
│  │  ├─ 6a
│  │  │  └─ 7578a44be4cfa350932b965154c445e9c7a135
│  │  ├─ 6b
│  │  │  └─ c96f0b77527dd2a68ab5c55058261a87f3bb5c
│  │  ├─ 6e
│  │  │  └─ d1ccb524e1998be8ddb48b25aae584bfb9f050
│  │  ├─ 75
│  │  │  └─ 3fd4955b0b8dd6e1944d4bbd13477e5febeb35
│  │  ├─ 78
│  │  │  └─ 690e695e7d5ebb5ff93cabaf9720632cb56a6f
│  │  ├─ 86
│  │  │  └─ aca2c764116cb8ce70ed328d772a39dbb88d82
│  │  ├─ 89
│  │  │  └─ b1e008aab4ea432aee6a2f7cc6cd5a21319708
│  │  ├─ 8c
│  │  │  └─ c8a706d12ab787d61044f75ee740bdf4614079
│  │  ├─ 8f
│  │  │  └─ 1021c52464f5f5e457fce54d82cbb7040746c3
│  │  ├─ 90
│  │  │  └─ 49d9fa176ebf8a4c71b92e1d662bffec23d03d
│  │  ├─ 95
│  │  │  ├─ 72c733edd243e69db24a963ccb4e51f2b0474b
│  │  │  └─ decb790e7dfc1cfd62975d785cd51c00656a22
│  │  ├─ 99
│  │  │  └─ bd3af345cd552e992117473b0597a44e658e29
│  │  ├─ 9c
│  │  │  └─ 6211562cdfd7ea2edc5aba1037a71f2bca970b
│  │  ├─ a5
│  │  │  └─ 5f6d4d5c202c899994cc0f0bfd705f4be450cb
│  │  ├─ ad
│  │  │  └─ b2f7791baeb55a92d038dba9b925bd2bfc13e4
│  │  ├─ b0
│  │  │  └─ 274acc934a422326167cd499cedfcecfb8626b
│  │  ├─ b3
│  │  │  └─ 3dfa75201e6b0c663b81c4fa6032afbb3ee5cf
│  │  ├─ bd
│  │  │  ├─ a19299129b7825a5072fb9e605b88830075b1f
│  │  │  └─ dd2a66dac0356ed99d05d74a489508765c19a8
│  │  ├─ c2
│  │  │  └─ 2edf659ffa8b1cbc006d68e2dff9761a8956da
│  │  ├─ cb
│  │  │  └─ d8a4627b9c249f133b0147a4167bdbce4f307d
│  │  ├─ cc
│  │  │  └─ c669864fb3d3861797ebf0c3d196df1306e8b3
│  │  ├─ d0
│  │  │  ├─ a5c994bf1152d310d973b2a295f8f9cbba5baa
│  │  │  └─ d57a4806d0f1fcb4b5a425c6f85219623b7821
│  │  ├─ d1
│  │  │  └─ 5f217415c625cc683ede255e243845c9ea7500
│  │  ├─ d3
│  │  │  └─ 429587397abb52e64b290384292f3a6100aadc
│  │  ├─ d5
│  │  │  └─ 47f83c537100098aade81a8a8db920805e9884
│  │  ├─ da
│  │  │  ├─ 81b29556338070a1a5795425e5f40f250c2443
│  │  │  ├─ 854ad5e4328335a6372de939a24f9efd7210e4
│  │  │  ├─ e6303a7d30e6e654f7c0bb94be3de078cc372a
│  │  │  └─ f422ad475c0a73eb00535543603df1a9fba431
│  │  ├─ de
│  │  │  └─ 7037075546931852b5ffe723af61b5e6df5039
│  │  ├─ e6
│  │  │  └─ caf64507cbe30396a7645c79d22573fcde149f
│  │  ├─ ed
│  │  │  └─ 65d429f66e87dc2c04f13f32894b3573f3742f
│  │  ├─ f0
│  │  │  └─ d2667d1b80be0d3dc1cc7d6b8300c4f1d6e270
│  │  ├─ f1
│  │  │  └─ 62cffe8abf276fafc2db42080bc713986cb8f1
│  │  ├─ f3
│  │  │  └─ e30f774994ae41de3f659d8ba48a85b30c26a1
│  │  ├─ f5
│  │  │  └─ db3ef97b13aa16f9bea2c36d13073598bc15b8
│  │  ├─ f6
│  │  │  └─ 937c6b89e87a7eacc5108858ffcdfd10288c5b
│  │  ├─ f7
│  │  │  └─ e062c1fd3685cc7d0795ef8debc613627c1332
│  │  ├─ ff
│  │  │  └─ dd8a419a5dc9d55b711e8ea955db15a0d46d96
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-f7941bfaf915e23118e311b7538d8f0cdffd6c2a.idx
│  │     └─ pack-f7941bfaf915e23118e311b7538d8f0cdffd6c2a.pack
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  ├─ finance-tracker
│     │  │  └─ main
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ .hintrc
├─ middleware
│  ├─ auth.ts
│  └─ login.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ pages
│  └─ api
│     ├─ auth
│     │  ├─ login.ts
│     │  ├─ profile.ts
│     │  ├─ register.ts
│     │  ├─ yourApiRoute.ts
│     │  └─ [...nextauth].ts
│     ├─ sendEmail.ts
│     ├─ transactions
│     │  ├─ expenses.ts
│     │  ├─ index.ts
│     │  └─ [transactionId].ts
│     └─ users
│        └─ [userId].ts
├─ public
│  ├─ logo.png
│  ├─ map.png
│  ├─ menu_btn.png
│  ├─ slide1.jpg
│  ├─ slide2.jpg
│  ├─ slide3.jpg
│  └─ transaction-list.png
├─ README.md
├─ src
│  ├─ app
│  │  ├─ client-layout.tsx
│  │  ├─ components
│  │  │  ├─ AuthStatus.tsx
│  │  │  ├─ CallToActionButton.tsx
│  │  │  ├─ Carousel.tsx
│  │  │  ├─ Chart.tsx
│  │  │  ├─ css
│  │  │  │  ├─ Carousel.module.css
│  │  │  │  ├─ Chart.module.css
│  │  │  │  ├─ CTA.module.css
│  │  │  │  ├─ Dashboard.module.css
│  │  │  │  ├─ Educational.module.css
│  │  │  │  ├─ FeaturesSection.module.css
│  │  │  │  ├─ Footer.module.css
│  │  │  │  ├─ HowItWorks.module.css
│  │  │  │  ├─ Navbar.module.css
│  │  │  │  └─ TransactionForm.module.css
│  │  │  ├─ Educational.tsx
│  │  │  ├─ FeaturesSection.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ HowItWorks.tsx
│  │  │  ├─ Navbar.tsx
│  │  │  └─ TransactionForm.tsx
│  │  ├─ globals.css
│  │  ├─ Home.module.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ pages
│  │     ├─ about
│  │     │  ├─ About.module.css
│  │     │  └─ page.tsx
│  │     ├─ contact
│  │     │  ├─ Contact.module.css
│  │     │  └─ page.tsx
│  │     ├─ login
│  │     │  ├─ Login.Module.css
│  │     │  └─ page.tsx
│  │     ├─ profile
│  │     │  ├─ page.tsx
│  │     │  └─ Profile.module.css
│  │     └─ register
│  │        ├─ page.tsx
│  │        └─ Register.module.css
│  ├─ context
│  │  ├─ AuthContext.tsx
│  │  └─ UserContext.tsx
│  ├─ lib
│  │  ├─ auth.ts
│  │  ├─ mongodb.ts
│  │  └─ types.ts
│  └─ models
│     ├─ Expense.ts
│     └─ User.ts
├─ tsconfig.json
└─ types
   └─ next-auth.d.ts

```
```
finance-tracker-main
├─ .eslintrc.json
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        ├─ finance-tracker
│  │        │  └─ main
│  │        └─ origin
│  │           └─ main
│  ├─ objects
│  │  ├─ 03
│  │  │  └─ 51702dbd42fdd2d6861577e801d7adf131f2ae
│  │  ├─ 04
│  │  │  └─ 64c30f4e540febb986c3fb03f2b8c66355fae8
│  │  ├─ 0e
│  │  │  └─ bb6a69ced1219c4e3e06ce6e325be58bb2150d
│  │  ├─ 0f
│  │  │  └─ 537905e180d4c2ab7572dae96724ae38396cf8
│  │  ├─ 12
│  │  │  └─ 13fd11d94ff46b22d5ff836a6d6868e49dc2d5
│  │  ├─ 18
│  │  │  ├─ 3e3d98ad8dbbcb53e707e623798ad6a05dc9e1
│  │  │  └─ 70ae70dbd6134df1c712215744fe1ee376a92e
│  │  ├─ 1b
│  │  │  ├─ 90d8eea170bb26021b7a81f03b0fe0198e362e
│  │  │  └─ f8689454327a4253f3bf300e05a2ee628abaf1
│  │  ├─ 1c
│  │  │  └─ 2271d5cfa50e599fda9dcdf6023ec391da444b
│  │  ├─ 1d
│  │  │  └─ 4504066787ccf0779e0029aa4a757ab39c2154
│  │  ├─ 28
│  │  │  ├─ 08aa0f3d1e30d8e1d7c1e5b2a437f7f51dfd47
│  │  │  ├─ 102fa65c25a99c1b0c688db4b68785a8830336
│  │  │  └─ 71484d65bf42bebb555761f4588b33dd053189
│  │  ├─ 29
│  │  │  └─ d43c0e9b4af683a039671c4459ad7b2a91cceb
│  │  ├─ 2c
│  │  │  └─ 24d551c936cf3587abcfe5eb76388c59365eb9
│  │  ├─ 34
│  │  │  └─ 170f0de8165ec32508d3f7c087e986ee234d81
│  │  ├─ 38
│  │  │  └─ 1db81a0671efb2b6a0ff88eefdf24765f4812c
│  │  ├─ 3f
│  │  │  └─ 330eb0d5369c2e12ea2f7465584a14cbf27e89
│  │  ├─ 50
│  │  │  ├─ 35b38269bf4c1c8804346f9e5fa2d8f2b10ba8
│  │  │  └─ b1aa1c74691d58d3abbb6206142d451c7fccb4
│  │  ├─ 53
│  │  │  └─ 08672a8197874e1b12c844d16bb0d714de9d5c
│  │  ├─ 55
│  │  │  └─ 7bff7768a31135e610efcf9e96b296fa50c7fa
│  │  ├─ 58
│  │  │  ├─ 201ebea70a30cddde43b4c73aee768a1093a22
│  │  │  └─ 5ff6d70e3e5cca220fa505dd9f792b25eefe7a
│  │  ├─ 5a
│  │  │  └─ 85a4d972dcb921f4914f519cf20733dd70ea88
│  │  ├─ 5e
│  │  │  └─ d854d6024cbdd4b7c845a9c3836f9f3b5b6c14
│  │  ├─ 5f
│  │  │  └─ dcdfac8359bf9d47590f2f2bca4750815fd2c4
│  │  ├─ 61
│  │  │  ├─ 1d66ff435635bf1f5ebdd06bd367b433cf4526
│  │  │  └─ fcc6fde13e281b9a34d0634379b9ed85619494
│  │  ├─ 65
│  │  │  └─ df7f10d914e2f625610b13c0d08beb8155e6b8
│  │  ├─ 6a
│  │  │  └─ 7578a44be4cfa350932b965154c445e9c7a135
│  │  ├─ 6b
│  │  │  └─ c96f0b77527dd2a68ab5c55058261a87f3bb5c
│  │  ├─ 6e
│  │  │  └─ d1ccb524e1998be8ddb48b25aae584bfb9f050
│  │  ├─ 75
│  │  │  └─ 3fd4955b0b8dd6e1944d4bbd13477e5febeb35
│  │  ├─ 78
│  │  │  └─ 690e695e7d5ebb5ff93cabaf9720632cb56a6f
│  │  ├─ 86
│  │  │  └─ aca2c764116cb8ce70ed328d772a39dbb88d82
│  │  ├─ 89
│  │  │  └─ b1e008aab4ea432aee6a2f7cc6cd5a21319708
│  │  ├─ 8c
│  │  │  └─ c8a706d12ab787d61044f75ee740bdf4614079
│  │  ├─ 8f
│  │  │  └─ 1021c52464f5f5e457fce54d82cbb7040746c3
│  │  ├─ 90
│  │  │  └─ 49d9fa176ebf8a4c71b92e1d662bffec23d03d
│  │  ├─ 95
│  │  │  ├─ 72c733edd243e69db24a963ccb4e51f2b0474b
│  │  │  └─ decb790e7dfc1cfd62975d785cd51c00656a22
│  │  ├─ 99
│  │  │  └─ bd3af345cd552e992117473b0597a44e658e29
│  │  ├─ 9c
│  │  │  └─ 6211562cdfd7ea2edc5aba1037a71f2bca970b
│  │  ├─ a5
│  │  │  └─ 5f6d4d5c202c899994cc0f0bfd705f4be450cb
│  │  ├─ ad
│  │  │  └─ b2f7791baeb55a92d038dba9b925bd2bfc13e4
│  │  ├─ b0
│  │  │  └─ 274acc934a422326167cd499cedfcecfb8626b
│  │  ├─ b3
│  │  │  └─ 3dfa75201e6b0c663b81c4fa6032afbb3ee5cf
│  │  ├─ bd
│  │  │  ├─ a19299129b7825a5072fb9e605b88830075b1f
│  │  │  └─ dd2a66dac0356ed99d05d74a489508765c19a8
│  │  ├─ c2
│  │  │  └─ 2edf659ffa8b1cbc006d68e2dff9761a8956da
│  │  ├─ cb
│  │  │  └─ d8a4627b9c249f133b0147a4167bdbce4f307d
│  │  ├─ cc
│  │  │  └─ c669864fb3d3861797ebf0c3d196df1306e8b3
│  │  ├─ d0
│  │  │  ├─ a5c994bf1152d310d973b2a295f8f9cbba5baa
│  │  │  └─ d57a4806d0f1fcb4b5a425c6f85219623b7821
│  │  ├─ d1
│  │  │  └─ 5f217415c625cc683ede255e243845c9ea7500
│  │  ├─ d3
│  │  │  └─ 429587397abb52e64b290384292f3a6100aadc
│  │  ├─ d5
│  │  │  └─ 47f83c537100098aade81a8a8db920805e9884
│  │  ├─ da
│  │  │  ├─ 81b29556338070a1a5795425e5f40f250c2443
│  │  │  ├─ 854ad5e4328335a6372de939a24f9efd7210e4
│  │  │  ├─ e6303a7d30e6e654f7c0bb94be3de078cc372a
│  │  │  └─ f422ad475c0a73eb00535543603df1a9fba431
│  │  ├─ de
│  │  │  └─ 7037075546931852b5ffe723af61b5e6df5039
│  │  ├─ e6
│  │  │  └─ caf64507cbe30396a7645c79d22573fcde149f
│  │  ├─ ed
│  │  │  └─ 65d429f66e87dc2c04f13f32894b3573f3742f
│  │  ├─ f0
│  │  │  └─ d2667d1b80be0d3dc1cc7d6b8300c4f1d6e270
│  │  ├─ f1
│  │  │  └─ 62cffe8abf276fafc2db42080bc713986cb8f1
│  │  ├─ f3
│  │  │  └─ e30f774994ae41de3f659d8ba48a85b30c26a1
│  │  ├─ f5
│  │  │  └─ db3ef97b13aa16f9bea2c36d13073598bc15b8
│  │  ├─ f6
│  │  │  └─ 937c6b89e87a7eacc5108858ffcdfd10288c5b
│  │  ├─ f7
│  │  │  └─ e062c1fd3685cc7d0795ef8debc613627c1332
│  │  ├─ ff
│  │  │  └─ dd8a419a5dc9d55b711e8ea955db15a0d46d96
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-f7941bfaf915e23118e311b7538d8f0cdffd6c2a.idx
│  │     └─ pack-f7941bfaf915e23118e311b7538d8f0cdffd6c2a.pack
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  ├─ finance-tracker
│     │  │  └─ main
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ .hintrc
├─ middleware
│  ├─ auth.ts
│  └─ login.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ pages
│  └─ api
│     ├─ auth
│     │  ├─ login.ts
│     │  ├─ profile.ts
│     │  ├─ register.ts
│     │  ├─ yourApiRoute.ts
│     │  └─ [...nextauth].ts
│     ├─ sendEmail.ts
│     ├─ transactions
│     │  ├─ expenses.ts
│     │  ├─ index.ts
│     │  └─ [transactionId].ts
│     └─ users
│        └─ [userId].ts
├─ public
│  ├─ logo.png
│  ├─ map.png
│  ├─ menu_btn.png
│  ├─ slide1.jpg
│  ├─ slide2.jpg
│  ├─ slide3.jpg
│  └─ transaction-list.png
├─ README.md
├─ src
│  ├─ app
│  │  ├─ client-layout.tsx
│  │  ├─ components
│  │  │  ├─ AuthStatus.tsx
│  │  │  ├─ CallToActionButton.tsx
│  │  │  ├─ Carousel.tsx
│  │  │  ├─ Chart.tsx
│  │  │  ├─ css
│  │  │  │  ├─ Carousel.module.css
│  │  │  │  ├─ Chart.module.css
│  │  │  │  ├─ CTA.module.css
│  │  │  │  ├─ Dashboard.module.css
│  │  │  │  ├─ Educational.module.css
│  │  │  │  ├─ FeaturesSection.module.css
│  │  │  │  ├─ Footer.module.css
│  │  │  │  ├─ HowItWorks.module.css
│  │  │  │  ├─ Navbar.module.css
│  │  │  │  └─ TransactionForm.module.css
│  │  │  ├─ Educational.tsx
│  │  │  ├─ FeaturesSection.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ HowItWorks.tsx
│  │  │  ├─ Navbar.tsx
│  │  │  └─ TransactionForm.tsx
│  │  ├─ globals.css
│  │  ├─ Home.module.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ pages
│  │     ├─ about
│  │     │  ├─ About.module.css
│  │     │  └─ page.tsx
│  │     ├─ contact
│  │     │  ├─ Contact.module.css
│  │     │  └─ page.tsx
│  │     ├─ login
│  │     │  ├─ Login.Module.css
│  │     │  └─ page.tsx
│  │     ├─ profile
│  │     │  ├─ page.tsx
│  │     │  └─ Profile.module.css
│  │     └─ register
│  │        ├─ page.tsx
│  │        └─ Register.module.css
│  ├─ context
│  │  ├─ AuthContext.tsx
│  │  └─ UserContext.tsx
│  ├─ lib
│  │  ├─ auth.ts
│  │  ├─ mongodb.ts
│  │  └─ types.ts
│  └─ models
│     ├─ Expense.ts
│     └─ User.ts
├─ tsconfig.json
└─ types
   └─ next-auth.d.ts

```