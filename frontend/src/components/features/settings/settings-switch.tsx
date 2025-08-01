import React from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "#/i18n/declaration";
import { StyledSwitchComponent } from "./styled-switch-component";

interface SettingsSwitchProps {
  testId?: string;
  name?: string;
  onToggle?: (value: boolean) => void;
  defaultIsToggled?: boolean;
  isToggled?: boolean;
  isBeta?: boolean;
}

export function SettingsSwitch({
  children,
  testId,
  name,
  onToggle,
  defaultIsToggled,
  isToggled: controlledIsToggled,
  isBeta,
}: React.PropsWithChildren<SettingsSwitchProps>) {
  const { t } = useTranslation();
  const [isToggled, setIsToggled] = React.useState(defaultIsToggled ?? false);

  const handleToggle = (value: boolean) => {
    setIsToggled(value);
    onToggle?.(value);
  };

  return (
    <label className="flex items-center gap-2 w-fit cursor-pointer">
      <input
        hidden
        data-testid={testId}
        name={name}
        type="checkbox"
        onChange={(e) => handleToggle(e.target.checked)}
        checked={controlledIsToggled ?? isToggled}
      />

      <StyledSwitchComponent isToggled={controlledIsToggled ?? isToggled} />

      <div className="flex items-center gap-1">
        <span className="text-sm">{children}</span>
        {isBeta && (
          <span className="text-[11px] leading-4 text-[#0D0F11] font-[500] tracking-tighter bg-primary px-1 rounded-full">
            {t(I18nKey.BADGE$BETA)}
          </span>
        )}
      </div>
    </label>
  );
}
