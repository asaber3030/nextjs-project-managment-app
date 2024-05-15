"use client";

import { useContext, useState } from "react";
import { useUpdateUser } from "@/hooks/useUser";
import { useSession } from "next-auth/react";

import { Save } from "lucide-react";
import { LoadingButton } from "@/components/loading-button";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { UserDataContext } from "@/providers/user-data-provider";

export const MainAccountSettings = () => {

  const user = useContext(UserDataContext)

  const session = useSession()

  const [privateAccount, setPrivateAccount] = useState(user?.private)
  const [allowDirectCode, setAllowDirectCode] = useState(user?.allowUsingDirectCode)
  const [showDetails, setShowDetails] = useState(user?.showDetails)

  const { mutateChangeAccountPrivacy, changeAccountPrivacyLoading } = useUpdateUser()

  const handleChangePrivacy = () => {
    mutateChangeAccountPrivacy({
      data: {
        private: privateAccount,
        allowUsingDirectCode: allowDirectCode,
        showDetails
      }
    })
    session.update({
      allowUsingDirectCode: false,
      private: true,
      showDetails: false
    })
  }

  return ( 
    <div>
      
      <h2 className='text-lg mb-4 font-medium border-b rounded-md'>Account Privacy</h2>

      <div className='space-y-4'>
        <div className="flex items-center space-x-2">
          <Switch defaultChecked={allowDirectCode} onCheckedChange={(value) => setAllowDirectCode(value)} id="allow-direct-code" />
          <Label htmlFor="allow-direct-code">Anyone Can Use My Direct code to add me to teams?</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch defaultChecked={privateAccount} onCheckedChange={(value) => setPrivateAccount(value)} id="private-account" />
          <Label htmlFor="private-account">Private account</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch defaultChecked={showDetails} onCheckedChange={(value) => setShowDetails(value)} id="show-details" />
          <Label htmlFor="show-details">Show My Details to public</Label>
        </div>

        <div className='flex justify-end'>
          <LoadingButton onClick={handleChangePrivacy} loading={changeAccountPrivacyLoading} variant='secondaryMain'><Save className='size-4' /> Save</LoadingButton>
        </div>

      </div>
      
    </div>
  );
}