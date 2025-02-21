<script>
	import '../app.css';
	import {
		Avatar,
		Dropdown,
		DropdownItem,
		Footer,
		FooterBrand,
		FooterCopyright,
		FooterLink,
		FooterLinkGroup,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl
	} from 'flowbite-svelte';
	import { getStores } from '$app/stores';
	import { goto } from '$app/navigation';

	const { page } = getStores();

	$: user = $page.data.user;
	$: avatarUrl = $page.data.avatarUrl;

	async function handleLogout() {
		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				await goto('/', { invalidateAll: true });
				// Force page reload to ensure all auth states are cleared
				window.location.href = '/';
			}
		} catch (err) {
			console.error('Logout error:', err);
		}
	}
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
		<NavUl class="h-full items-center">
			<NavLi href="/" class="flex h-full items-center">Početna</NavLi>
			<NavLi href="/dinamo-rajsavac" class="flex h-full items-center">NK Dinamo Rajsavac</NavLi>
			<NavLi href="/zelena-laguna" class="flex h-full items-center">ŠRD Zelena laguna</NavLi>
			<NavLi href="/podrum" class="flex h-full items-center">Podrum</NavLi>
			{#if user}
				<NavLi class="flex h-full items-center">
					<Avatar id="user-drop" src={avatarUrl} alt="User settings" class="cursor-pointer" />
					<Dropdown triggeredBy="#user-drop">
						<DropdownItem href="/admin">Profile</DropdownItem>
						<DropdownItem href="/admin/settings">Settings</DropdownItem>
						<DropdownItem on:click={handleLogout}>Sign out</DropdownItem>
					</Dropdown>
				</NavLi>
			{/if}
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
				<FooterLink href="/admin">Admin</FooterLink>
				<FooterLink href="/">Contact</FooterLink>
			</FooterLinkGroup>
		</div>
		<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
		<FooterCopyright href="/" by="Rajsavac" />
	</Footer>
</div>
