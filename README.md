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
```

├─ middleware
│  ├─ auth.ts
│  └─ login.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ pages
│  └─ api
│     ├─ articles
│     │  └─ index.ts
│     ├─ auth
│     │  ├─ forgot-password.ts
│     │  ├─ login.ts
│     │  ├─ register.ts
│     │  ├─ reset-password.ts
│     │  ├─ verify-reset-token.ts
│     │  └─ [...nextauth].ts
│     ├─ transactions
│     │  ├─ index.ts
│     │  └─ [id].ts
│     └─ users
│        ├─ [userId]
│        │  ├─ add.ts
│        │  └─ transactions
│        │     ├─ index.ts
│        │     └─ [transactionId].ts
│        └─ [userId].ts
├─ public
├─ README.md
├─ src
│  ├─ app
│  │  ├─ client-layout.tsx
│  │  ├─ components
│  │  │  ├─ ArticleModal.tsx
│  │  │  ├─ CallToActionButton.tsx
│  │  │  ├─ Carousel.tsx
│  │  │  ├─ css
│  │  │  │  ├─ ArticleModal.module.css
│  │  │  │  ├─ Carousel.module.css
│  │  │  │  ├─ CTA.module.css
│  │  │  │  ├─ Dashboard.module.css
│  │  │  │  ├─ Educational.module.css
│  │  │  │  ├─ FeaturesSection.module.css
│  │  │  │  ├─ Footer.module.css
│  │  │  │  ├─ HowItWorks.module.css
│  │  │  │  └─ Navbar.module.css
│  │  │  ├─ Educational.tsx
│  │  │  ├─ FeaturesSection.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ HowItWorks.tsx
│  │  │  └─ Navbar.tsx
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
│  │     ├─ forgot-password
│  │     │  ├─ ForgotPassword.module.css
│  │     │  └─ page.tsx
│  │     ├─ login
│  │     │  ├─ Login.module.css
│  │     │  └─ page.tsx
│  │     ├─ profile
│  │     │  ├─ components
│  │     │  │  ├─ BalanceChart.tsx
│  │     │  │  ├─ CategoryChart.tsx
│  │     │  │  ├─ css
│  │     │  │  │  ├─ BalanceChart.module.css
│  │     │  │  │  ├─ CategoryChart.module.css
│  │     │  │  │  ├─ Pagination.module.css
│  │     │  │  │  ├─ ProfileDropdown.module.css
│  │     │  │  │  └─ TransactionForm.module.css
│  │     │  │  ├─ CurrencySwitcher.tsx
│  │     │  │  ├─ Pagination.tsx
│  │     │  │  ├─ ProfileDropdown.tsx
│  │     │  │  └─ TransactionForm.tsx
│  │     │  ├─ page.tsx
│  │     │  └─ Profile.module.css
│  │     ├─ register
│  │     │  ├─ page.tsx
│  │     │  └─ Register.module.css
│  │     └─ reset-password
│  │        ├─ page.tsx
│  │        └─ ResetPassword.module.css
│  ├─ context
│  │  ├─ AuthContext.tsx
│  │  └─ UserContext.tsx
│  ├─ lib
│  │  ├─ auth.ts
│  │  ├─ mongodb.ts
│  │  ├─ sendEmail.ts
│  │  ├─ sendResetPasswordEmail.ts
│  │  ├─ templates
│  │  │  └─ forgot-password.hbs
│  │  └─ updateResetToken.ts
│  └─ models
│     ├─ Article.ts
│     ├─ Transaction.ts
│     └─ User.ts
├─ tsconfig.json
└─ types
   └─ next-auth.d.ts
