'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignupRequestSchema, type SignupRequest } from '../lib/dto';
import { useSignup } from '../hooks/useSignup';
import { RoleSelector } from './role-selector';
import { TermsAgreement } from './terms-agreement';
import { ALL_TERMS } from '../constants/terms';

export const SignupForm = () => {
  const signupMutation = useSignup();

  const form = useForm<SignupRequest>({
    resolver: zodResolver(SignupRequestSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      role: undefined,
      termsAgreements: ALL_TERMS.map((term) => ({
        type: term.type,
        agreed: false,
      })),
    },
  });

  const onSubmit = (data: SignupRequest) => {
    signupMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* 이름 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder="홍길동" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 휴대폰번호 */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>휴대폰번호</FormLabel>
              <FormControl>
                <Input placeholder="010-1234-5678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 이메일 */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 비밀번호 */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="8자 이상, 대소문자+숫자 포함"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 역할 선택 */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>역할 선택</FormLabel>
              <FormControl>
                <RoleSelector
                  value={field.value ?? null}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 약관 동의 */}
        <div className="space-y-4">
          <FormLabel>약관 동의</FormLabel>
          <div className="space-y-3">
            {ALL_TERMS.map((term, index) => (
              <FormField
                key={term.type}
                control={form.control}
                name={`termsAgreements.${index}.agreed`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TermsAgreement
                        value={field.value}
                        onChange={field.onChange}
                        termsType={term.type}
                        label={term.label}
                        url={term.url}
                        required={term.required}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {/* 제출 버튼 */}
        <Button
          type="submit"
          className="w-full"
          disabled={signupMutation.isPending}
        >
          {signupMutation.isPending ? '처리 중...' : '회원가입'}
        </Button>
      </form>
    </Form>
  );
};