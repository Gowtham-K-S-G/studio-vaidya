
"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';

const formSchema = z.object({
  name: z.string().min(1, 'Doctor name is required.'),
  specialty: z.string().min(1, 'Specialty is required.'),
  hospital: z.string().min(1, 'Hospital is required.'),
  address: z.string().min(1, 'Address is required.'),
  phone: z.string().min(1, 'Phone number is required.'),
});

type FormValues = z.infer<typeof formSchema>;

type AddDoctorFormProps = {
    onSubmit: (data: FormValues) => void;
};

export function AddDoctorForm({ onSubmit }: AddDoctorFormProps) {
  const { language } = useLanguage();
  const t = translations[language].appointments.addDoctor;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: '',
        specialty: '',
        hospital: '',
        address: '',
        phone: '',
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.nameLabel}</FormLabel>
              <FormControl>
                <Input placeholder={t.namePlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.specialtyLabel}</FormLabel>
              <FormControl>
                <Input placeholder={t.specialtyPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hospital"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.hospitalLabel}</FormLabel>
              <FormControl>
                <Input placeholder={t.hospitalPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.addressLabel}</FormLabel>
              <FormControl>
                <Input placeholder={t.addressPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.phoneLabel}</FormLabel>
              <FormControl>
                <Input placeholder={t.phonePlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
            <Button type="submit">{t.submitButton}</Button>
        </div>
      </form>
    </Form>
  );
}
