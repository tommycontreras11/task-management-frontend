"use server";

import { IWorkspace } from "@/interfaces/workspace.interface";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, secretKey, {
    algorithms: ["HS256"],
  });

  return payload;
}

export async function setCookie(token: string) {
  cookies().set("access_token", token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
}

export async function userLogged() {
    const response = await fetch("http://localhost:4000/api/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": await getSession() as string,
        }
    })

    const data = await response.json();
    return data;
}

export async function getAllWorkspace(): Promise<IWorkspace[]> {
    const response = await fetch("http://localhost:4000/api/workspaces", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": await getSession() as string,
        }
    })

  const data = await response.json()

  return data
}

export async function logOut() {
  cookies().set("access_token", "", { expires: new Date(0) });
}

export async function getSession() {
  const cookie = cookies().get("access_token")?.value;
  if (!cookie) return null;

  return cookie;
}
