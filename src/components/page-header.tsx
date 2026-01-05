
"use client";

import { useLanguage, languages } from '@/context/language-context';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogOut, Settings, User, Globe, Check, LogIn, UserPlus } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { useFirebase } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  const { language, setLanguage } = useLanguage();
  const { auth, user, isUserLoading } = useFirebase();
  const router = useRouter();

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const getInitials = () => {
      if(user?.displayName) {
          const names = user.displayName.split(' ');
          if(names.length > 1) {
              return `${names[0][0]}${names[names.length - 1][0]}`;
          }
          return user.displayName.substring(0,2);
      }
      if(user?.email) {
          return user.email.substring(0,2).toUpperCase();
      }
      return 'U';
  }


  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
       <div className="md:hidden">
          <SidebarTrigger />
        </div>
      <div className="flex-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.entries(languages).map(([code, name]) => (
                     <DropdownMenuItem key={code} onSelect={() => setLanguage(code as keyof typeof languages)}>
                        <Check className={`mr-2 h-4 w-4 ${language === code ? 'opacity-100' : 'opacity-0'}`} />
                        {name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

        {isUserLoading ? (
            <Avatar>
                <AvatarFallback>?</AvatarFallback>
            </Avatar>
        ) : user ? (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                    <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.uid}/40/40`} />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.displayName || user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        ) : (
             <div className="flex items-center gap-2">
                <Button asChild variant="outline">
                    <Link href="/login">
                        <LogIn className="mr-2 h-4 w-4"/>
                        Login
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/signup">
                        <UserPlus className="mr-2 h-4 w-4"/>
                        Sign Up
                    </Link>
                </Button>
            </div>
        )}
      </div>
    </header>
  );
}

