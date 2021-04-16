import { existsSync, readFileSync } from 'fs';

interface PackageInfo {
  name: string;
  description: string;
  keywords: string[];
  license: string;
  dependencies: any;
  devDependencies: any;
}

/**
 * 读取项目的 package.json 文件
 * @param pkgPath
 * @returns
 */
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

/**
 * 判断是不是 alita 项目
 * @param name
 * @returns
 */
export function isAlitaOrUmi(name: string) {
  return /^(alita|umi|bigfish|dumi)$/.test(name);
}

/**
 * 获取当前安装的框架版本
 * @param pkg
 * @returns
 */
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

/**
 * 检测是否是合格的项目
 * @param pkg
 * @returns
 */
export function checkIsAlitaPackage(pkg: PackageInfo): boolean {
  return getAlitaOrUmiVersion(pkg).length > 0;
}

/**
 * 检测当前路径是否是正确的项目路径
 * @param pkgPath
 * @returns
 */
export function checkIsAlitaPackageFromPkgPath(pkgPath: string): boolean {
  return checkIsAlitaPackage(getPkgInfo(pkgPath));
}
