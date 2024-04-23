import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { appThemeCookieName } from "@/lib/constants";

import { getCookie } from 'cookies-next'
import { ChangeEvent, useState } from "react";

export const ThemeToggler = () => {

  const theme = getCookie(appThemeCookieName) ?? 'light';
  const [currentTheme, setCurrentTheme] = useState(theme)

  const handleChange = (checked: boolean) => {
    setCurrentTheme(checked ? 'dark' : 'light')
  }

  return ( 
    <div className="flex justify-between items-center space-x-2">
      <Label htmlFor="theme-toggler-id">Switch to {currentTheme === 'light' ? 'Dark mode' : 'Light mode'}</Label>
      <Switch id="theme-toggler-id" onCheckedChange={handleChange} />
    </div>
  );
}