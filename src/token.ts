import qiniu from 'qiniu';

export function genToken(bucket: string, ak: string, sk: string, objectKey: string = ''): string {
  const mac = new qiniu.auth.digest.Mac(ak, sk);
  let cfg: qiniu.rs.PutPolicyOptions = {
    scope: bucket
  }
  if(objectKey) {
    cfg.scope = `${bucket}:${objectKey}`
  }
  const putPolicy = new qiniu.rs.PutPolicy(cfg);
  const token = putPolicy.uploadToken(mac);
  return token;
}
