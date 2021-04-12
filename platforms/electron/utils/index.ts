import { existsSync, readFileSync } from 'fs';

interface PackageInfo {
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
  return /^(alita|umi|bigfish|dumi)/.test(name);
}

export function checkIsAlitaPackage(pkg: PackageInfo): boolean {
  return (
    Object.keys({
      ...pkg.dependencies,
      ...pkg.devDependencies,
    }).filter((name) => {
      return isAlitaOrUmi(name);
    }).length > 0
  );
}

export function checkIsAlitaPackageFromPkgPath(pkgPath: string): boolean {
  return checkIsAlitaPackage(getPkgInfo(pkgPath));
}
