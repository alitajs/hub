import { existsSync, readFileSync } from 'fs';
import got from 'got';
import { execSync } from 'child_process';

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

/**
 * 通过 npm CDN url 获取数据
 * @param pkg 包名
 */
export async function fetchCDNData({ pkg = '', summary = 'db.json', version = 'latest' }) {
  const prefixCDN = `https://cdn.jsdelivr.net/npm/${pkg}@${version}`;
  try {
    const { body } = await got(`${prefixCDN}/${summary}`);
    return {
      data: JSON.parse(body),
      success: true,
    };
  } catch (error) {
    return {
      message: error.message,
      data: undefined,
      success: false,
    };
  }
}

let npmClients: string[] = [];

/**
 * 获取当前使用的npm
 * @returns string []
 */
export const getNpmClient = () => {
  if (!npmClients) return npmClients;
  const ret = ['tnpm', 'cnpm', 'npm', 'ayarn', 'tyarn', 'yarn'].filter((npmClient) => {
    try {
      execSync(`${npmClient} --version`, { stdio: 'ignore' });
      return true;
      // eslint-disable-next-line no-empty
    } catch (e) {}
    return false;
  });

  npmClients = ret;
  return ret;
};
