import { existsSync, readFileSync } from 'fs';

interface PackageInfo {
  name: string;
  description: string;
  keywords: string[];
  license: string;
  dependencies: any;
  devDependencies: any;
}

export function getPkgInfo(pkgPath: string): PackageInfo {
  let pkg = {} as PackageInfo;
  if (existsSync(pkgPath)) {
    try {
      pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    } catch (e) {
      console.log('no find package.json');
    }
  }
  return pkg;
}

export function isAlitaOrUmi(name: string) {
  return /^(alita|umi|bigfish|dumi)$/.test(name);
}

export function getAlitaOrUmiVersion(pkg: PackageInfo): any[] {
  const dependencies = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };
  const keys = Object.keys(dependencies).filter((name) => {
    return isAlitaOrUmi(name);
  });
  const data: any[] = [];
  keys.forEach((key) => {
    data.push(`${key}:${dependencies[key]}`);
  });
  return data;
}
export function checkIsAlitaPackage(pkg: PackageInfo): boolean {
  return getAlitaOrUmiVersion(pkg).length > 0;
}

export function checkIsAlitaPackageFromPkgPath(pkgPath: string): boolean {
  return checkIsAlitaPackage(getPkgInfo(pkgPath));
}
