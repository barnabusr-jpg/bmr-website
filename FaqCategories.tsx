"use client";

import { Tabs, TabItem } from "@/components/ui/Tabs";
import { FaqCategory } from "./data";

interface FaqCategoriesProps {
    categories: FaqCategory[];
    selectedCategory: FaqCategory;
    setSelectedCategory: (category: FaqCategory) => void;
    categoryCounts: Record<string, number>;
}

export default function FaqCategories({
    categories,
    selectedCategory,
    setSelectedCategory,
    categoryCounts
}: FaqCategoriesProps) {
    const categoryLabels: Record<FaqCategory, string> = {
        all: "All",
        templates: "Templates",
        components: "Components",
        licensing: "Licensing",
        support: "Support"
    };

    // Convert categories to TabItem format
    const tabItems: TabItem<FaqCategory>[] = categories.map((category) => ({
        id: category,
        label: categoryLabels[category],
        count: categoryCounts[category]
    }));

    return (
        <Tabs
            items={tabItems}
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            variant="pill"
            size="md"
            className="mb-6 sm:mb-8 px-1 overflow-x-auto pb-2"
            inactiveTabClassName="bg-transparent text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100/20 dark:hover:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700"
        />
    );
}
