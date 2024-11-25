"use client";

import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);

      const res = await fetch(`/api/search?q=${input}`);

      const data = (await res.json()) as {
        results: string[];
        duration: number;
      };

      setSearchResults(data);
    };

    fetchData();
  }, [input]);

  return (
    <main className="h-screen w-screen grainy">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5">
        <h1 className="text-5xl tracking-tight font-bold">SpeedSearch ⚡</h1>
        <p className="text-zinc-900 text-lg max-w-prose text-center">
          Hono, Next.js ve CloudFlare ile yüksek performanslı bir API <br />{" "}
          Aşağıdaki sorguyu çalıştırın ve sonuçlarınızı milisaniye cinsinden
          alın.
        </p>

        <div className="max-w-md w-full">
          <Command>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="Ülkeleri arayın..."
              className="placeholder:text-zinc-500"
            />
            <CommandList>
              {searchResults?.results.length === 0 && (
                <CommandEmpty>Ülke Bulunamadı.</CommandEmpty>
              )}

              {searchResults?.results && (
                <CommandGroup heading="Sonuçlar">
                  {searchResults.results.map((result, index) => (
                    <CommandItem key={index} value={result} onSelect={setInput}>
                      {result}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {searchResults?.results && (
                <>
                  <div className="h-px w-full bg-zinc-200"></div>
                  <p className="p-2 text-xs text-zinc-500">
                    {searchResults?.duration.toFixed(0)} milisaniyede{" "}
                    {searchResults?.results.length} tane ülke bulundu.
                  </p>
                </>
              )}
            </CommandList>
          </Command>
        </div>
      </div>
    </main>
  );
}
