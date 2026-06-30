import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { useAuth } from '@/context/AuthenticationContext';

export default function TabLayout() {
  const { user } = useAuth();

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
        <NativeTabs.Trigger.Label>Dashboard</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="applications">
        <NativeTabs.Trigger.Icon sf="briefcase.fill" md="work" />
        <NativeTabs.Trigger.Label>Applications</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name={user ? 'profile' : 'login'}>
        <NativeTabs.Trigger.Icon sf="person.circle.fill" md="person" />
        <NativeTabs.Trigger.Label>{user ? 'Profile' : 'Login'}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
