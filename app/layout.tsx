import { Inter as FontSans } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Provider from './provider';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});
export const metadata: Metadata = {
	title: 'ColabDoc',
	description: 'Collaborative document editing',
	// openGraph: {
	//   type: 'website',
	//   locale: 'en_US',
	//   url: 'https://colabdoc.com',
	//   site_name: 'ColabDoc',
	//   images: [
	//     {
	//       url: 'https://colabdoc.com/og-image.png',
	//       width: 1200,
	//       height: 630,
	//       alt: 'ColabDoc',
	//     },
	//   ],
	// },
	// twitter: {
	//   handle: '@colabdoc',
	//   site: '@colabdoc',
	//   cardType:'summary_large_image',
	// },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
				variables: { colorPrimary: '#3371FF', fontSize: '16px' },
			}}>
			<html
				lang='en'
				suppressHydrationWarning>
				<body
					className={cn(
						'min-h-screen font-sans antialiased',
						fontSans.variable,
					)}>
					<Provider>{children}</Provider>
				</body>
			</html>
		</ClerkProvider>
	);
}
