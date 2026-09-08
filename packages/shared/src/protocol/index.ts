// Binary protocol module
export class BinaryReader {
  private buffer: DataView;
  private offset = 0;

  constructor(buffer: ArrayBuffer) {
    this.buffer = new DataView(buffer);
  }

  readByte(): number {
    return this.buffer.getUint8(this.offset++);
  }

  readWord(): number {
    const value = this.buffer.getUint16(this.offset, true);
    this.offset += 2;
    return value;
  }

  readDWord(): number {
    const value = this.buffer.getUint32(this.offset, true);
    this.offset += 4;
    return value;
  }

  readString(): string {
    const len = this.readDWord();
    const bytes = new Uint8Array(this.buffer.buffer, this.offset, len);
    this.offset += len;
    return new TextDecoder().decode(bytes);
  }
}

export class BinaryWriter {
  private buffers: Uint8Array[] = [];

  writeByte(value: number): void {
    this.buffers.push(new Uint8Array([value]));
  }

  writeWord(value: number): void {
    const buf = new Uint8Array(2);
    new DataView(buf.buffer).setUint16(0, value, true);
    this.buffers.push(buf);
  }

  writeDWord(value: number): void {
    const buf = new Uint8Array(4);
    new DataView(buf.buffer).setUint32(0, value, true);
    this.buffers.push(buf);
  }

  writeString(value: string): void {
    const encoded = new TextEncoder().encode(value);
    this.writeDWord(encoded.length);
    this.buffers.push(encoded);
  }

  toBuffer(): ArrayBuffer {
    const total = this.buffers.reduce((sum, buf) => sum + buf.length, 0);
    const result = new Uint8Array(total);
    let offset = 0;
    for (const buf of this.buffers) {
      result.set(buf, offset);
      offset += buf.length;
    }
    return result.buffer;
  }
}
