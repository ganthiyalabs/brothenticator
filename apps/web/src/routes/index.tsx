import { createFileRoute, redirect } from "@tanstack/react-router";
import SearchBar from "@/components/searchbar";
import RecoverCodes from "@/components/recoverCodes";
import { useState } from "react";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
	component: HomeComponent,
	beforeLoad: async () => {
		const session = await authClient.getSession();
		if (!session.data) {
			redirect({
				to: "/login",
				throw: true,
			});
		}
		return { session };
	},
});

function HomeComponent() {
	const recoveryCodesMutationOptions = trpc.recoveryCodes.generate.mutationOptions();
  const recoveryCodesMutation  = useMutation(recoveryCodesMutationOptions)
	const [query, setQuery] = useState("");

	const recoveryCodes = recoveryCodesMutation.data ?? [];

	const handleGenerate = () => {
		recoveryCodesMutation.mutate(undefined, {
			onSuccess: (data) => {

			},
		});
	};

	// Generate codes on initial load
	React.useEffect(() => {
		if (!recoveryCodesMutation.data && !recoveryCodesMutation.isPending) {
			recoveryCodesMutation.mutate();
		}
	}, []);

	return (
		<div className="container mx-auto max-w-3xl px-4 py-4">
			<SearchBar value={query} onChange={setQuery} />
			<RecoverCodes recoveryCodes={recoveryCodes} query={query} onGenerate={handleGenerate} />
		</div>
	);
}
