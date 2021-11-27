import { describe, test, expect, jest } from '@jest/globals';
import Routes from "../../src/routes.js";
import fs from "fs";
import FileHelper from '../../src/fileHelper.js';

describe('#FileHelper', () => {
   describe('#getFileStatus', () => {
      test('it should return files statuses in correct format', async () => {

         const statMock = {
            dev: 2053,
            mode: 33204,
            nlink: 1,
            uid: 1000,
            gid: 1000,
            rdev: 0,
            blksize: 4096,
            ino: 16779477,
            size: 155598,
            blocks: 304,
            atimeMs: 1637971680703.4263,
            mtimeMs: 1637971679228,
            ctimeMs: 1637971679227.3848,
            birthtimeMs: 1637971594969.0186,
            atime: '2021-11-27T00:08:00.703Z',
            mtime: '2021-11-27T00:07:59.228Z',
            ctime: '2021-11-27T00:07:59.227Z',
            birthtime: '2021-11-27T00:06:34.969Z'
         }

         const mockUser = 'felippedeiro'
         process.env.USER = mockUser
         const filename = 'file.png'

         jest.spyOn(fs.promises, fs.promises.readdir.name).mockResolvedValue([filename])
         jest.spyOn(fs.promises, fs.promises.stat.name).mockResolvedValue(statMock)

         const result = await FileHelper.getFilesStatus('/tmp')

         const expectedResult = [
            {
               size: '156 kB',
               lastModified: statMock.birthtime,
               owner: mockUser,
               file: filename
            }
         ]

         expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
         expect(result).toMatchObject(expectedResult)
      })
   })
})
