import fs = require('fs');
const { readFileSync, readdirSync, writeFileSync } = fs;
import path = require('path');
const { resolve } = path;

export async function write(path: string, data: any) {
  return await writeFileSync(resolve(__dirname, path), data); 
};

export async function getDir(path: string) {
  return await readdirSync(resolve(__dirname, path)); 
};

export async function getFile(path: string) {
  return await readFileSync(resolve(__dirname, path)); 
};

