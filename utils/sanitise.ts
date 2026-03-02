export function sanitiseObject (object: any) {
   return JSON.parse(JSON.stringify(object));
}