import { useMemo, useRef } from "react";
import CircularCountdown from "./countDown";

export interface RecoveryCodeItem {
	secret_id: string;
	issuer: string;
	label: string;
	code: string;
}

interface RecoverCodesProps {
	recoveryCodes: RecoveryCodeItem[];
	query?: string;
	onGenerate?: () => void;
}

export default function RecoverCodes({ recoveryCodes, query, onGenerate }: RecoverCodesProps) {
	const hasGeneratedRef = useRef(false);

	const items = useMemo(() => {
		hasGeneratedRef.current = false;
		return recoveryCodes.map((secret) => ({
			id: secret.secret_id,
			secret_id: secret.secret_id,
			issuer: secret.issuer,
			label: secret.label,
			code: secret.code,
		}));
	}, [recoveryCodes]);

	const handleTimerComplete = () => {
		if (!hasGeneratedRef.current && onGenerate) {
			hasGeneratedRef.current = true;
			onGenerate();
		}
	};

	const filtered = useMemo(() => {
		const q = (query ?? "").trim().toLowerCase();
		if (!q) return items;
		return items.filter((it) => {
			return (
				it.issuer.toLowerCase().includes(q) ||
				it.label.toLowerCase().includes(q) ||
				it.code.toLowerCase().includes(q)
			);
		});
	}, [items, query]);

	return (
		<div className="w-full max-w-md mx-auto mt-10">
			<div className="grid grid-cols-1 gap-3">
				{filtered.map((it) => {
					return (
						<div
							key={`${it.id}-${it.code}`}
							className="rounded-xl bg-secondary text-primary px-4 py-3 shadow-sm"
						>
							<div className="flex items-start justify-between">
								<div className="flex items-center gap-3 min-w-0 flex-1">
									<div className="min-w-0">
										<div className="font-medium truncate">{it.issuer}</div>
										{it.label ? (
											<div className="text-xs text-muted-foreground truncate">{it.label}</div>
										) : null}
									</div>
								</div>
								<div className="shrink-0">
									<CircularCountdown duration={30} size={36} strokeWidth={4} onComplete={handleTimerComplete} />
								</div>
							</div>
							<div className="mt-2 font-mono text-3xl tracking-widest select-all">
								{it.code}
							</div>
						</div>
					);
				})}
				{filtered.length === 0 ? (
					<div className="col-span-full text-center text-muted-foreground py-6">
						No matches
					</div>
				) : null}
			</div>
		</div>
	);
}
