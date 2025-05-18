export async function compressContent<T>(data: T): Promise<string> {
  const contentStr = JSON.stringify(data);
  // Convert to Uint8Array for compression
  const contentBytes = new TextEncoder().encode(contentStr);
  // Compress using gzip
  const stream = new CompressionStream('gzip');
  const writer = stream.writable.getWriter();
  writer.write(contentBytes);
  writer.close();
  const compressed = await new Response(stream.readable).arrayBuffer();
  // Convert to base64 for storage
  return Buffer.from(compressed).toString('base64');
}

export async function decompressContent<T>(base64Content: string): Promise<T> {
  // Convert base64 back to compressed bytes
  const compressed = Buffer.from(base64Content, 'base64');
  // Decompress
  const stream = new DecompressionStream('gzip');
  const writer = stream.writable.getWriter();
  writer.write(compressed);
  writer.close();
  const decompressed = await new Response(stream.readable).arrayBuffer();
  // Convert back to string and parse JSON
  const contentStr = new TextDecoder().decode(decompressed);
  return JSON.parse(contentStr);
}
