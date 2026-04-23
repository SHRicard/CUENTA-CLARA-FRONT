import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';

import {
  Badge,
  Button as AppButton,
  Card,
  Checkbox,
  DatePicker,
  FieldText,
  Modal,
  Select,
} from '../../components';
import { useConfirm } from '../../confirm';
import { PALETTE_NAMES } from '../../const';
import { ColorScheme, PaletteName } from '../../interface';
import { useSnackbar } from '../../snackbar';
import { useTheme } from '../../theme';

type ColorKey = keyof ColorScheme;

const COLOR_GROUPS: { label: string; keys: ColorKey[] }[] = [
  {
    label: 'Brand',
    keys: [
      'primary',
      'onPrimary',
      'primaryContainer',
      'secondary',
      'onSecondary',
      'secondaryContainer',
    ],
  },
  { label: 'Surface', keys: ['background', 'surface', 'surfaceVariant'] },
  { label: 'Content', keys: ['text', 'textMuted', 'border'] },
  { label: 'Status', keys: ['success', 'warning', 'error', 'info'] },
];

type TypoVariant =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall';

const TYPO_GROUPS: { label: string; variants: TypoVariant[] }[] = [
  { label: 'Display', variants: ['displayLarge', 'displayMedium', 'displaySmall'] },
  { label: 'Headline', variants: ['headlineLarge', 'headlineMedium', 'headlineSmall'] },
  { label: 'Title', variants: ['titleLarge', 'titleMedium', 'titleSmall'] },
  { label: 'Body', variants: ['bodyLarge', 'bodyMedium', 'bodySmall'] },
  { label: 'Label', variants: ['labelLarge', 'labelMedium', 'labelSmall'] },
];

const Section = ({ title, children }: { title: string; children: ReactNode }) => {
  const { theme } = useTheme();
  return (
    <View style={{ gap: theme.spacing.md, marginBottom: theme.spacing.xl }}>
      <Text variant="titleLarge" style={{ color: theme.colors.text }}>
        {title}
      </Text>
      <Divider />
      <View style={{ gap: theme.spacing.lg, paddingTop: theme.spacing.xs }}>{children}</View>
    </View>
  );
};

const GroupLabel = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  return (
    <Text
      variant="labelLarge"
      style={{ color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}
    >
      {children}
    </Text>
  );
};

const ColorSwatch = ({ name, color }: { name: string; color: string }) => {
  const { theme } = useTheme();
  return (
    <View style={{ width: '31%', gap: 4 }}>
      <View
        style={{
          height: 56,
          borderRadius: theme.radius.md,
          backgroundColor: color,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
      />
      <Text variant="labelSmall" numberOfLines={1} style={{ color: theme.colors.text }}>
        {name}
      </Text>
      <Text variant="bodySmall" style={{ color: theme.colors.textMuted }}>
        {color}
      </Text>
    </View>
  );
};

export const DesignSystem = () => {
  const { theme, palette, setPalette, toggleMode, modePreference } = useTheme();
  const { show, showSuccess, showError, showWarning, showInfo } = useSnackbar();
  const { confirm, confirmDelete, confirmDiscard } = useConfirm();
  const [smOpen, setSmOpen] = useState(false);
  const [mdOpen, setMdOpen] = useState(false);
  const [lgOpen, setLgOpen] = useState(false);
  const [dangerOpen, setDangerOpen] = useState(false);
  const { control } = useForm<{
    demo: string;
    demoError: string;
    accept: boolean;
    country: string;
    birthday: Date | null;
  }>({
    defaultValues: {
      demo: '',
      demoError: '',
      accept: false,
      country: '',
      birthday: null,
    },
  });

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: theme.spacing.lg }}
    >
      <Section title="Theme controls">
        <Button mode="contained-tonal" onPress={toggleMode}>
          Mode: {modePreference}
        </Button>
        <View style={{ flexDirection: 'row', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
          {PALETTE_NAMES.map((name) => (
            <Button
              key={name}
              compact
              mode={palette === name ? 'contained' : 'outlined'}
              onPress={() => setPalette(name as PaletteName)}
            >
              {name}
            </Button>
          ))}
        </View>
      </Section>

      <Section title="Colors">
        {COLOR_GROUPS.map((group) => (
          <View key={group.label} style={{ gap: theme.spacing.sm }}>
            <GroupLabel>{group.label}</GroupLabel>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
              {group.keys.map((k) => (
                <ColorSwatch key={k} name={k} color={theme.colors[k]} />
              ))}
            </View>
          </View>
        ))}
      </Section>

      <Section title="Typography">
        {TYPO_GROUPS.map((group) => (
          <View key={group.label} style={{ gap: theme.spacing.xs }}>
            <GroupLabel>{group.label}</GroupLabel>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                gap: theme.spacing.lg,
              }}
            >
              {group.variants.map((v) => (
                <View key={v} style={{ alignItems: 'flex-start' }}>
                  <Text variant={v} style={{ color: theme.colors.text }}>
                    Aa
                  </Text>
                  <Text variant="labelSmall" style={{ color: theme.colors.textMuted }}>
                    {v.replace(group.label.toLowerCase(), '').toLowerCase()}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </Section>

      <Section title="Fonts">
        {(['inter', 'quicksand', 'lato'] as const).map((family) => {
          const weights = Object.keys(
            theme.fonts[family],
          ) as (keyof (typeof theme.fonts)[typeof family])[];
          return (
            <View key={family} style={{ gap: theme.spacing.xs }}>
              <GroupLabel>{family}</GroupLabel>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md }}>
                {weights.map((w) => (
                  <View key={w as string} style={{ alignItems: 'center', minWidth: 72 }}>
                    <Text
                      style={{
                        fontFamily: theme.fonts[family][w],
                        fontSize: 28,
                        color: theme.colors.text,
                      }}
                    >
                      Aa
                    </Text>
                    <Text variant="labelSmall" style={{ color: theme.colors.textMuted }}>
                      {w as string}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </Section>

      <Section title="Spacing">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md }}>
          {(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).map((key) => (
            <View key={key} style={{ alignItems: 'center', minWidth: 60, gap: 4 }}>
              <View
                style={{
                  height: 32,
                  width: theme.spacing[key],
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.radius.xs,
                }}
              />
              <Text variant="labelSmall" style={{ color: theme.colors.text }}>
                {key}
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.textMuted }}>
                {theme.spacing[key]}
              </Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Radius">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md }}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((key) => (
            <View key={key} style={{ alignItems: 'center', minWidth: 60, gap: 4 }}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.radius[key],
                }}
              />
              <Text variant="labelSmall" style={{ color: theme.colors.text }}>
                {key}
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.textMuted }}>
                {theme.radius[key]}
              </Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Atom · FieldText">
        <FieldText control={control} name="demo" label="Default" placeholder="Type here" />
        <FieldText
          control={control}
          name="demoError"
          label="With helper"
          helperText="Lorem ipsum dolor sit amet"
        />
      </Section>

      <Section title="Atom · Checkbox">
        <Checkbox control={control} name="accept" label="Accept terms and conditions" />
        <Checkbox
          control={control}
          name="accept"
          label="Disabled example"
          disabled
          helperText="Este checkbox está deshabilitado"
        />
      </Section>

      <Section title="Atom · Select">
        <Select
          control={control}
          name="country"
          label="Country"
          placeholder="Pick one"
          options={[
            { value: 'ar', label: 'Argentina' },
            { value: 'br', label: 'Brazil' },
            { value: 'cl', label: 'Chile' },
            { value: 'mx', label: 'Mexico' },
            { value: 'us', label: 'United States' },
          ]}
        />
      </Section>

      <Section title="Atom · DatePicker">
        <DatePicker
          control={control}
          name="birthday"
          label="Birthday"
          helperText="Tap to open the calendar"
        />
      </Section>

      <Section title="System · Confirm">
        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>Presets</GroupLabel>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            <AppButton
              variant="danger"
              onPress={async () => {
                const itemName = 'Producto #42';
                const ok = await confirmDelete(itemName);
                if (ok) showSuccess(`${itemName} eliminado`, { icon: 'trash-can' });
                else showInfo('Cancelado');
              }}
            >
              Delete item
            </AppButton>

            <AppButton
              variant="outline"
              onPress={async () => {
                const ok = await confirmDiscard();
                if (ok) showSuccess('Cambios descartados', { icon: 'backup-restore' });
                else showInfo('Seguís editando');
              }}
            >
              Discard changes
            </AppButton>
          </View>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>Custom</GroupLabel>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            <AppButton
              variant="outline"
              onPress={async () => {
                const formName = 'Perfil';
                const ok = await confirm({
                  title: `¿Guardar ${formName.toLowerCase()}?`,
                  message: 'Se guardarán los datos en el servidor.',
                  titleIcon: 'cloud-upload',
                  acceptLabel: 'Guardar',
                });
                if (ok) showSuccess(`${formName} guardado`, { icon: 'content-save-check' });
              }}
            >
              Save form
            </AppButton>

            <AppButton
              variant="outline"
              onPress={async () => {
                const ok = await confirm({
                  title: '¿Cerrar sesión?',
                  message: 'Vas a tener que volver a iniciar sesión.',
                  titleIcon: 'logout',
                  acceptLabel: 'Cerrar sesión',
                  acceptVariant: 'danger',
                });
                if (ok) showWarning('Sesión cerrada');
              }}
            >
              Logout
            </AppButton>
          </View>
        </View>
      </Section>

      <Section title="System · Snackbar">
        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>Variants</GroupLabel>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            <AppButton variant="outline" onPress={() => showSuccess('Guardado correctamente')}>
              Success
            </AppButton>
            <AppButton variant="outline" onPress={() => showError('Algo falló al guardar')}>
              Error
            </AppButton>
            <AppButton variant="outline" onPress={() => showWarning('Revisá los campos')}>
              Warning
            </AppButton>
            <AppButton variant="outline" onPress={() => showInfo('Nueva versión disponible')}>
              Info
            </AppButton>
            <AppButton variant="outline" onPress={() => show({ message: 'Mensaje por defecto' })}>
              Default
            </AppButton>
          </View>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>With action</GroupLabel>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            <AppButton
              variant="outline"
              onPress={() =>
                show({
                  message: 'Perfil guardado',
                  variant: 'success',
                  duration: 5000,
                  action: {
                    label: 'Ver',
                    onPress: () => showInfo('Navegando al perfil...'),
                  },
                })
              }
            >
              Success + action
            </AppButton>

            <AppButton
              variant="outline"
              onPress={() =>
                show({
                  message: 'No se pudo conectar',
                  variant: 'error',
                  duration: 5000,
                  action: {
                    label: 'Reintentar',
                    onPress: () => showInfo('Reintentando...'),
                  },
                })
              }
            >
              Error + action
            </AppButton>

            <AppButton
              variant="outline"
              onPress={() =>
                show({
                  message: 'Elemento eliminado',
                  variant: 'warning',
                  duration: 5000,
                  action: {
                    label: 'Deshacer',
                    onPress: () => showSuccess('Restaurado'),
                  },
                })
              }
            >
              Warning + action
            </AppButton>
          </View>
        </View>
      </Section>

      <Section title="Atom · Modal">
        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>Sizes</GroupLabel>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            <AppButton variant="outline" onPress={() => setSmOpen(true)}>
              Open SM
            </AppButton>
            <AppButton variant="outline" onPress={() => setMdOpen(true)}>
              Open MD
            </AppButton>
            <AppButton variant="outline" onPress={() => setLgOpen(true)}>
              Open LG
            </AppButton>
          </View>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>Danger variant</GroupLabel>
          <AppButton variant="danger" onPress={() => setDangerOpen(true)}>
            Delete something
          </AppButton>
        </View>

        <Modal
          visible={smOpen}
          onDismiss={() => setSmOpen(false)}
          size="sm"
          title="Modal SM"
          titleIcon="information"
          onAccept={() => setSmOpen(false)}
        >
          <Text variant="bodyMedium" style={{ textAlign: 'center', color: theme.colors.text }}>
            Modal pequeño, ideal para confirmaciones rápidas.
          </Text>
        </Modal>

        <Modal
          visible={mdOpen}
          onDismiss={() => setMdOpen(false)}
          size="md"
          title="Modal MD"
          titleIcon="bell"
          acceptLabel="Entendido"
          onAccept={() => setMdOpen(false)}
        >
          <Text variant="bodyMedium" style={{ textAlign: 'center', color: theme.colors.text }}>
            Modal mediano (default). Espacio suficiente para descripciones más largas, formularios
            cortos o listas breves.
          </Text>
        </Modal>

        <Modal
          visible={lgOpen}
          onDismiss={() => setLgOpen(false)}
          size="lg"
          title="Modal LG"
          titleIcon="cog"
          acceptLabel="Guardar"
          onAccept={() => setLgOpen(false)}
        >
          <Text variant="bodyMedium" style={{ textAlign: 'center', color: theme.colors.text }}>
            Modal grande. Bueno para formularios más largos, previews de contenido o configuraciones
            agrupadas.
          </Text>
        </Modal>

        <Modal
          visible={dangerOpen}
          onDismiss={() => setDangerOpen(false)}
          size="sm"
          title="¿Eliminar?"
          titleIcon="alert-circle"
          acceptLabel="Eliminar"
          acceptVariant="danger"
          onAccept={() => setDangerOpen(false)}
        >
          <Text variant="bodyMedium" style={{ textAlign: 'center', color: theme.colors.text }}>
            Esta acción no se puede deshacer. ¿Confirmás?
          </Text>
        </Modal>
      </Section>

      <Section title="Atom · Badge">
        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>Variants</GroupLabel>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: theme.spacing.sm,
            }}
          >
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </View>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>Outline</GroupLabel>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: theme.spacing.sm,
            }}
          >
            <Badge variant="primary" outline>
              Primary
            </Badge>
            <Badge variant="success" outline>
              Success
            </Badge>
            <Badge variant="warning" outline>
              Warning
            </Badge>
            <Badge variant="error" outline>
              Error
            </Badge>
            <Badge variant="info" outline>
              Info
            </Badge>
          </View>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>Sizes</GroupLabel>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: theme.spacing.sm,
            }}
          >
            <Badge size="sm">1</Badge>
            <Badge size="md">12</Badge>
            <Badge size="lg">99+</Badge>
            <Badge size="sm">SM</Badge>
            <Badge size="md">MD</Badge>
            <Badge size="lg">LG</Badge>
          </View>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>Dots (status indicators)</GroupLabel>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: theme.spacing.md,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}>
              <Badge variant="success" dot />
              <Text variant="bodySmall" style={{ color: theme.colors.text }}>
                Online
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}>
              <Badge variant="warning" dot />
              <Text variant="bodySmall" style={{ color: theme.colors.text }}>
                Idle
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}>
              <Badge variant="error" dot />
              <Text variant="bodySmall" style={{ color: theme.colors.text }}>
                Offline
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}>
              <Badge variant="info" dot outline />
              <Text variant="bodySmall" style={{ color: theme.colors.text }}>
                Outline dot
              </Text>
            </View>
          </View>
        </View>
      </Section>

      <Section title="Atom · Button">
        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>Variants</GroupLabel>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            <AppButton variant="primary">Primary</AppButton>
            <AppButton variant="secondary">Secondary</AppButton>
            <AppButton variant="outline">Outline</AppButton>
            <AppButton variant="ghost">Ghost</AppButton>
            <AppButton variant="danger">Danger</AppButton>
          </View>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>Sizes</GroupLabel>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: theme.spacing.sm,
            }}
          >
            <AppButton size="sm">Small</AppButton>
            <AppButton size="md">Medium</AppButton>
            <AppButton size="lg">Large</AppButton>
          </View>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>States</GroupLabel>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            <AppButton loading>Loading</AppButton>
            <AppButton disabled>Disabled</AppButton>
            <AppButton icon="plus">With icon</AppButton>
          </View>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>Full width</GroupLabel>
          <AppButton fullWidth>Full width primary</AppButton>
          <AppButton fullWidth variant="outline">
            Full width outline
          </AppButton>
        </View>
      </Section>

      <Section title="Atom · Card">
        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>Variants</GroupLabel>
          <Card
            variant="elevated"
            title="Elevated card"
            subtitle="Sombra sutil, fondo surface"
            icon="star"
          >
            <Text variant="bodyMedium" style={{ color: theme.colors.text }}>
              Elevated es el default. Ideal para items de lista destacados.
            </Text>
          </Card>

          <Card variant="filled" title="Filled card" subtitle="Fondo surfaceVariant" icon="palette">
            <Text variant="bodyMedium" style={{ color: theme.colors.text }}>
              Filled usa un fondo tintado (sin sombra). Útil para secciones secundarias.
            </Text>
          </Card>

          <Card
            variant="outlined"
            title="Outlined card"
            subtitle="Borde sutil, sin sombra"
            icon="shape-outline"
          >
            <Text variant="bodyMedium" style={{ color: theme.colors.text }}>
              Outlined es el más liviano. Bueno para layouts densos.
            </Text>
          </Card>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>With cover + actions</GroupLabel>
          <View style={{ maxWidth: 360 }}>
            <Card
              title="Bahía desierta"
              subtitle="Playa del Este · 2.3 km"
              cover="https://picsum.photos/seed/beach/640/360"
              coverAspectRatio={16 / 9}
              actions={
                <>
                  <AppButton variant="ghost" size="sm">
                    Compartir
                  </AppButton>
                  <AppButton size="sm" icon="heart">
                    Me gusta
                  </AppButton>
                </>
              }
            >
              <Text variant="bodyMedium" style={{ color: theme.colors.text }}>
                Un spot tranquilo con vista al mar abierto.
              </Text>
            </Card>
          </View>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <GroupLabel>Clickable with chevron</GroupLabel>
          <Card
            title="Configuración de cuenta"
            subtitle="Perfil, seguridad y preferencias"
            icon="account-cog"
            rightIcon="chevron-right"
            onPress={() => showInfo('Card tapped')}
          />
          <Card
            variant="outlined"
            title="Notificaciones"
            subtitle="3 sin leer"
            icon="bell"
            rightIcon="chevron-right"
            onPress={() => showInfo('Notifications tapped')}
          />
        </View>
      </Section>
    </ScrollView>
  );
};
