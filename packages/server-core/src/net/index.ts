// Networking utilities

export class PacketBuffer {
  private buffer: Buffer;
  private offset = 0;

  constructor(size: number = 1024) {
    this.buffer = Buffer.alloc(size);
  }

  writeDWord(value: number): void {
    this.buffer.writeUInt32LE(value, this.offset);
    this.offset += 4;
  }

  readDWord(): number {
    const value = this.buffer.readUInt32LE(this.offset);
    this.offset += 4;
    return value;
  }

  getBuffer(): Buffer {
    return this.buffer.slice(0, this.offset);
  }
}
