"use server";

import { ICreateBoard } from "@/app/boards/interfaces/board.interface";
import { ICreateList } from "@/app/lists/interface/list.interface";
import { IResponse } from "@/interfaces/reponse.interface";
import { IUser, IWorkspace } from "@/interfaces/workspace.interface";
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

export async function userLogged(): Promise<IUser> {
  const response = await fetch("http://localhost:4000/api/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await getSession()) as string,
    },
  });

  const data = await response.json();
  return data;
}

export async function getAllWorkspace(): Promise<IWorkspace[]> {
  const response = await fetch("http://localhost:4000/api/workspaces", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await getSession()) as string,
    },
  });

  const data = await response.json();
  
  return data;
}

export async function getOneWorkspace(uuid: string): Promise<IWorkspace> {
  const response = await fetch(`http://localhost:4000/api/workspaces/${uuid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await getSession()) as string,
    },
  });  

  const data = await response.json()

  return data
}

export async function createBoard({ title, workspaceUUID, userUUIDs }: ICreateBoard): Promise<IResponse> {
  const response = await fetch("http://localhost:4000/api/boards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await getSession()) as string
    },
    body: JSON.stringify({
      workspaceUUID,
      title,
      userUUIDs
    }),
  })

  const data = await response.json()

  return {
    message: data.message || data.error.message,
    error: data.error ? true : false
  }
}

export async function createList({ title, boardUUID }: ICreateList): Promise<IResponse> {
  const response = await fetch("http://localhost:4000/api/lists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await getSession()) as string
    },
    body: JSON.stringify({
      title,
      boardUUID
    }),
  })

  const data = await response.json()
  
  return {
    message: data.message || data.error.message,
    error: data.error ? true : false
  }
}

export async function getAllList(): Promise<IResponse> {
  const response = await fetch("http://localhost:4000/api/lists", {
    method: "GET",  
    headers: {
      "Content-Type": "application/json",
      Authorization: (await getSession()) as string
    },
  })

  const data = await response.json()
  
  return {
    message: data.message || data.error.message,
    error: data.error ? true : false
  }
}

export async function getOneList(uuid: string): Promise<IResponse> {
  const response = await fetch(`http://localhost:4000/api/lists/${uuid}`, {
    method: "GET",  
    headers: {
      "Content-Type": "application/json",
      Authorization: (await getSession()) as string
    },
  })

  const data = await response.json()
  
  return {
    message: data.message || data.error.message,
    error: data.error ? true : false
  }
}


export async function logOut() {
  cookies().set("access_token", "", { expires: new Date(0) });
}

export async function getSession() {
  const cookie = cookies().get("access_token")?.value;
  if (!cookie) return null;

  return cookie;
}
