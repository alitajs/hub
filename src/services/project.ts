import { callRemote } from './socket';

export async function getNpmClients(): Promise<{ data: string[] }> {
  return callRemote({
    type: 'getNpmClients',
  });
}

export async function listDirectory(payload: any) {
  return callRemote({
    type: 'listDirectory',
    payload,
  });
}

export async function selectDirectory(payload: any) {
  return callRemote({
    type: 'selectDirectory',
    payload,
  });
}
