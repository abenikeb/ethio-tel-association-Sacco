"use client";
import type React from "react";
import GuestNavBar from "@/components/GuestNavBar";

<<<<<<< HEAD
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Sacco Booking - Book Your Bus Tickets Online",
//   description:
//     "Book your bus tickets online with Sacco Booking. Easy, fast, and reliable bus reservations for your journey.",

//   icons: {
//     icon: [
//       {
//         url: "/icon-light-32x32.png",
//         media: "(prefers-color-scheme: light)",
//       },
//       {
//         url: "/icon-dark-32x32.png",
//         media: "(prefers-color-scheme: dark)",
//       },
//       {
//         url: "/icon.svg",
//         type: "image/svg+xml",
//       },
//     ],
//     apple: "/apple-icon.png",
//   },
// };

export default function DashboardLayout({
	children,
=======
export default function GuestDashboard({
  children,
>>>>>>> origin/dev
}: Readonly<{
	children: React.ReactNode;
}>) {
<<<<<<< HEAD
	const [isNavbarLoaded, setIsNavbarLoaded] = useState(false);
	return (
		<html lang="en">
			<body className={`font-sans antialiased`}>
				<GuestNavBar />
=======
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <GuestNavBar />
>>>>>>> origin/dev

				<main>{children}</main>
			</body>
		</html>
	);
}
