'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Product } from '@/constants/mock-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const formSchema = z.object({
  photo_url: z
    .any()
    .refine((files) => files?.length == 1, 'Gambar diperlukan.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Ukuran file maksimal adalah 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'File .jpg, .jpeg, .png dan .webp diterima.'
    ),
  nama_mobil: z.string().min(2, {
    message: 'Nama mobil harus terdiri dari setidaknya 2 karakter.'
  }),
  plat_nomor: z.string().min(1, {
    message: 'Nomor plat diperlukan.'
  }),
  harga_sewa: z.number().min(0, {
    message: 'Harga sewa harus berupa angka positif.'
  }),
  deskripsi: z.string().min(10, {
    message: 'Deskripsi harus terdiri dari setidaknya 10 karakter.'
  }),
  profit: z.number().min(0, {
    message: 'Profit harus berupa angka positif.'
  }),
  tahun_mobil: z
    .number()
    .min(1886, {
      message: 'Masukkan tahun yang valid.'
    })
    .max(9999, {
      message: 'Tahun maksimal terdiri dari 4 digit.'
    }),
  kondisi_lecet: z.boolean(),
  merk: z.string().min(1, {
    message: 'Merk diperlukan.'
  }),
  warna: z.string().min(1, {
    message: 'Warna diperlukan.'
  }),
  nama_pemilik: z.string().min(1, {
    message: 'Nama pemilik diperlukan.'
  }),
  jenis_transmisi: z.string().min(1, {
    message: 'Jenis transmisi diperlukan.'
  }),
  jenis_bbm: z.string().min(1, {
    message: 'Jenis BBM diperlukan.'
  })
});

export default function ProductForm({
  initialData,
  pageTitle
}: {
  initialData: Product | null;
  pageTitle: string;
}) {
  const defaultValues = {
    photo_url: null,
    nama_mobil: initialData?.nama_mobil || '',
    plat_nomor: initialData?.plat_nomor || '',
    harga_sewa: initialData?.harga_sewa || 0,
    deskripsi: initialData?.deskripsi || '',
    profit: initialData?.profit || 0,
    tahun_mobil: initialData?.tahun_mobil || new Date().getFullYear(),
    kondisi_lecet: initialData?.kondisi_lecet || false,
    merk: initialData?.merk || '',
    warna: initialData?.warna || '',
    nama_pemilik: initialData?.nama_pemilik || '',
    jenis_transmisi: initialData?.jenis_transmisi || '',
    jenis_bbm: initialData?.jenis_bbm || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="photo_url"
              render={({ field }) => (
                <div className="space-y-6">
                  <FormItem className="w-full">
                    <FormLabel>Foto</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={1}
                        maxSize={MAX_FILE_SIZE}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="nama_mobil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Mobil</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama mobil" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="plat_nomor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Plat</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nomor plat" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="harga_sewa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga Sewa</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Masukkan harga sewa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profit</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Masukkan profit"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tahun_mobil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Masukkan tahun"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kondisi_lecet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kondisi (Lecet)</FormLabel>
                    <FormControl>
                      <Input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="merk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Merk</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan merk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="warna"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warna</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan warna" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nama_pemilik"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Pemilik</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama pemilik" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jenis_transmisi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Transmisi</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan jenis transmisi"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jenis_bbm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis BBM</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan jenis BBM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="deskripsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan deskripsi"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Kirim</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
