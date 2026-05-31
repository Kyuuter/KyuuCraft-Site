import { useState } from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { themes } from "@/utils/Custom functions/project-custom-variables";
import { Theme } from "@/utils/ThemeProvider";
import { useTheme } from "@/utils/Custom functions/use-theme";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

function TestingStyling() {
  const message: string = "Testing text";
  const formatBlock = "flex flex-col bg-accent rounded-md p-5";
  const formatSeperator = "bg-accent-foreground mt-5 mb-5";
  const [theme, changeTheme] = useState<Theme>("System");
  const { setTheme } = useTheme();

  const gridPattern = `grid grid-cols-3 gap-5 p-5`;
  return (
    <div className="flex page-holder">
      Debugging Page to Test Styling
      <div className="flex flex-row">
        <p className="main-content-text">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Settings</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Testing Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Change Theme to...
                  <DropdownMenuShortcut>C</DropdownMenuShortcut>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value={theme}>
                    {themes.map((theme: Theme) => (
                      <DropdownMenuRadioItem
                        key={theme}
                        value={theme}
                        onClick={() => (setTheme(theme), changeTheme(theme))}
                      >
                        {theme}
                        <DropdownMenuShortcut key={theme}>
                          {theme[0]}
                        </DropdownMenuShortcut>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </p>
      </div>
      <Separator />
      <h2>
        {" "}
        NOTE: Each test block uses the "accent" variable to define its color and
        the titles use the "h1" format.{" "}
      </h2>
      <div className={gridPattern}>
        <div className={formatBlock}>
          <h1>Testing Reg text</h1>
          <Separator className={formatSeperator} />
          <div className="border border-muted-foreground">
            <h2>Header level 2</h2>
          </div>
          <div className="border border-muted-foreground">
            <h3>Header level 3</h3>
          </div>

          <div className="border border-muted-foreground">
            <p>{message} from p attribute</p>
          </div>
          <div className="border border-muted-foreground">
            <p className="main-content-text">
              {" "}
              {message} from main content text (in index.css)
            </p>
          </div>
        </div>
        <div className={formatBlock}>
          <h1>Testing UI Elements</h1>
          <Separator className={formatSeperator} />
          <Card>
            <CardContent>
              <p>{message} for card content</p>
              <Badge>Badge in card</Badge>
            </CardContent>
            <CardDescription>Description font color</CardDescription>
          </Card>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Accordion Test</AccordionTrigger>
              <AccordionContent>Accordion Test inner</AccordionContent>
            </AccordionItem>
          </Accordion>
          <Label htmlFor="test" className="p-5">
            Testing the label
          </Label>
        </div>
        <div className="border-8 border-accent p-2 rounded-md">
          <h1>Skeleton Test</h1>
          <Separator className={formatSeperator} />
          <div className="space-y-2">
            <div className="flex flex-row justify-between">
              <Skeleton className="h-40 w-40 rounded-full" />
              <Skeleton className="h-40 w-40 rounded-full" />
              <Skeleton className="h-40 w-40 rounded-full" />
            </div>
            <Skeleton className="h-40 w-[1/3]" />
            <Skeleton className="h-40 w-[1/3]" />
          </div>
        </div>
        <div className={formatBlock}>
          <h1>Variable Comparison</h1>
          <Separator className="bg-accent-foreground" />
          <div className="flex flex-col m-5 justify-between">
            <div className="text-foreground bg-background">
              <p>Foreground text on background</p>
            </div>
            <div className="text-primary-foreground bg-primary">
              <p>Primary foreground text on primary</p>
            </div>
            <div className="text-secondary-foreground bg-secondary">
              <p>Secondary foreground text on secondary</p>
            </div>
            <div className="text-accent-foreground bg-accent">
              <p>Accent foreground text on accent</p>
            </div>
            <div className="text-muted-foreground bg-muted">
              <p>Muted foreground text on muted</p>
            </div>
            <div className="text-destructive-foreground bg-destructive">
              <p>Destructive foreground text on destructive</p>
            </div>
          </div>
        </div>
        <div className={formatBlock}>
          <h1>Form Test</h1>
          <Separator className={formatSeperator} />
        </div>
      </div>
    </div>
  );
}

export default TestingStyling;
