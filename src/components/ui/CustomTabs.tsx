import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

interface Tab {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  tabs: Tab[];
  defaultValue: string;
  className?: string; // optional prop
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  defaultValue,
  className
}) => {
  return (
    <Tabs defaultValue={defaultValue} className={`${className} w-full`}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
