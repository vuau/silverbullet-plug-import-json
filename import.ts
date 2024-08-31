import { editor, space } from "@silverbulletmd/silverbullet/syscalls";

export async function restore() {
  const file = await editor.uploadFile();
  await editor.flashNotification("Restoring from JSON file: " + file.name);
  const excludes = (await editor.prompt(
    "exclude pages from restore (separate by comma): ",
    "",
  ) as string).split(",");
  const decoder = new TextDecoder();
  const str = decoder.decode(file.content);
  for (const [_, [name, value]] of Object.entries(JSON.parse(str)).entries()) {
    if (excludes.indexOf(name) !== -1) continue;
    await space.writePage(name, value as string);
    console.log('created page: ', name);
  }
  await editor.flashNotification("Restored successfully");
}
