import React from 'react';
import type { FC } from 'react';
import { Input, Popover } from 'antd';
import { selectDirectory } from '@/services/project';

interface DirectoryFormProps {
  onChange?: (data: any) => void;
  value?: string;
  placeholder?: string;
  size?: string;
}
const DirectoryForm: FC<DirectoryFormProps> = ({
  onChange,
  value,
  placeholder = '请选择项目新建路径',
  ...reset
}) => {
  return (
    <div
      onClick={async (e) => {
        e.stopPropagation();
        const { path } = await selectDirectory('');
        onChange?.(path);
      }}
    >
      <Popover content={value} placement="bottomRight">
        <Input placeholder={placeholder} value={value} {...reset} />
      </Popover>
    </div>
  );
};

export default DirectoryForm;
