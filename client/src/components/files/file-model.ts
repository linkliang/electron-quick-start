export class FileModel {
  public fileName: string;
  public fileSize: any;
  public fileLastModified: Date;

  public constructor(fileInfo: any) {
    this.fileName = fileInfo[0];
    this.fileSize = fileInfo[1];
    this.fileLastModified = fileInfo[2];
  }
}