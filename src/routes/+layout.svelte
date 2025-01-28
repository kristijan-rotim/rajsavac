<script>
	import '../app.css';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterBrand,
		FooterLink
	} from 'flowbite-svelte';
</script>

<div class="flex min-h-screen flex-col">
	<Navbar rounded color="form">
		<NavBrand href="/">
			<img src="/NK_Dinamo_Rajsavac.png" class="me-3 h-6 sm:h-9" alt="Rajsavac Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				>Rajsavac</span
			>
		</NavBrand>
		<NavHamburger />
		<NavUl>
			<NavLi href="/">Početna</NavLi>
			<NavLi href="/dinamo-rajsavac">NK Dinamo Rajsavac</NavLi>
			<NavLi href="/zelena-laguna">ŠRD Zelena laguna</NavLi>
			<NavLi href="/podrum">Podrum</NavLi>
		</NavUl>
	</Navbar>

	<main class="flex-1">
		<slot></slot>
	</main>

	<Footer footerType="logo">
		<div class="sm:flex sm:items-center sm:justify-between">
			<FooterBrand
				href="https://rajsavac.vercel.app"
				src="/NK_Dinamo_Rajsavac.png"
				alt="Rajsavac Logo"
				name="Rajsavac"
			/>
			<FooterLinkGroup
				ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
			>
				<FooterLink href="/">About</FooterLink>
				<FooterLink href="/">Privacy Policy</FooterLink>
				<FooterLink href="/admin" data-sveltekit-preload-data="hover">Admin</FooterLink>
				<FooterLink href="/">Contact</FooterLink>
			</FooterLinkGroup>
		</div>
		<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
		<FooterCopyright href="/" by="Rajsavac" />
	</Footer>
</div>
