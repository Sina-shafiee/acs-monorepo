"use client";
import { Button } from "@acs/ui/base/button";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "#/utils/trpc";

export function App() {
	const healthCheck = useQuery(trpc.healthCheck.queryOptions());

	return (
		<div className="container mx-auto max-w-3xl px-4 py-12 font-sans">
			<div className="grid gap-6">
				<section className="rounded-lg border p-4">
					<h2 className="mb-1 font-medium">وضعیت اتصال</h2>
					<div className="flex items-center gap-2">
						<div
							className={`h-2 w-2 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`}
						/>
						<span className="text-muted-foreground text-sm">
							{healthCheck.isLoading
								? "در حال اتصال..."
								: healthCheck.data
									? "وصل شدید"
									: "قطع شدید"}
						</span>
					</div>
				</section>
				<Button className="max-w-max" size="lg" variant="outline">
					سلام دنیا !
				</Button>
			</div>
		</div>
	);
}
