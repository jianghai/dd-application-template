export interface IComponentProps {
  id: string;
  bizType?: string;
  bizAlias?: string;
  readOnly?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  label?: any;
  placeholder?: any;
  defaultValue?: any;
  value?: any;
  children?: object[];
  rely?: {
    type: 'formula' | 'async' | 'rely' | 'formula';
    fields?: string[]; // 关联依赖的其它字段id
    formula?: string; // type = formula
    formulaId?: string; // type = formula
    version?: 1 | 2; // 2为新版公式，1或者为空为旧版本
  };
  [propName: string]: any;
  onRowClick?: (index: number, actionType: string) => void;
}

export interface SuitOpenApi {
  form: SuitOpenForm;
  spi: SuitOpenSpi;
  jsapi: SuitOpenJsapi;
  util: SuiteOpenUtil;
}

export type ISuiteValidator = (
  props: any,
) => string | undefined | Promise<string | undefined>;

export interface SuitOpenField {
  isViewMode: () => boolean;
  isInvisible: () => boolean;
  isHidden: () => boolean;
  show: (forceUpdate?: boolean) => void;
  hide: (forceUpdate?: boolean) => void;

  getProps: () => IComponentProps;
  getProp: (propName: string) => any;
  setProp: (propName: string, propValue: any, forceUpdate?: boolean) => void;

  getValue: () => any;
  setValue: (value: any, forceUpdate?: boolean) => void;
  onValueChange: (fn: (value?: any) => void) => () => void;

  getExtendValue: () => any;
  setExtendValue: (extendValue: any, forceUpdate?: boolean) => void;
  onExtendValueChange: (
    fn: (extendValue?: any) => void,
  ) => () => void;

  onPropChange: (fn: () => void) => () => void;
}

export interface SuitOpenComplexField extends SuitOpenField {
  getFields: () => SuitOpenField[];
}

export interface SuitOpenForm {
  getFields: () => SuitOpenField[];
  getFieldByBizAlias: (bizAlias: string) => SuitOpenField | undefined;

  isFieldViewMode: (bizAlias: string) => boolean;
  isFieldInvisible: (bizAlias: string) => boolean;
  isFieldHidden: (bizAlias: string) => boolean;
  showField: (bizAlias: string, forceUpdate?: boolean) => void;
  hideField: (bizAlias: string, forceUpdate?: boolean) => void;

  getFieldValue: (bizAlias: string) => any;
  getBizContext: () => {
    corpId: string;
    [key: string]: any;
  };
  setFieldValue: (bizAlias: string, value: any, forceUpdate?: boolean) => void;
  onFieldValueChange: (bizAlias: string, fn: (value?: any) => void) => (() => void) | undefined;

  getFieldExtendValue: (bizAlias: string) => any;
  setFieldExtendValue: (bizAlias: string, extendValue: any, forceUpdate?: boolean) => void;
  onFieldExtendValueChange: (
    bizAlias: string,
    fn: (extendValue?: any) => void,
  ) => (() => void) | undefined;

  getFieldProps: (bizAlias: string) => IComponentProps | undefined;
  getFieldProp: (bizAlias: string, propName: string) => any;
  setFieldProp: (bizAlias: string, propName: string, propValue: any, forceUpdate?: boolean) => void;
  onFieldPropChange: (bizAlias: string, fn: () => void) => (() => void) | undefined;

  getSuiteProps: () => IComponentProps;
  getSuiteProp: (propName: string) => any;
  setSuiteProp: (propName: string, value: any) => void;
  onSuitPropChange: (fn: () => void) => (() => void);
  addSuiteValidator: (fn: ISuiteValidator) => void;
  addFieldValidator: (bizAlias: string, fn: ISuiteValidator) => void;
}

export interface IFieldValue {
  key: string;
  label?: string;
  bizAlias?: string;
  value?: any;
  extendValue?: any;
  componentName?: string;
}

export interface SuitOpenSpi {
  refreshData: <T>(
    params: { bizAsyncData: IFieldValue[]; modifiedBizAlias: string[]; },
    mockData?: any,
  ) => Promise<T>
}

export interface SuitOpenJsapi {
  [propName: string]: any;
}

export interface SuiteOpenUtil {
  openSelectPage: (param: {
    title?: string;
    url: string;
    data?: any;
  }) => Promise<any>;
}

export interface SuitSetterApi {
  getSuiteProps: () => IComponentProps;
  setSuiteProps: (props: IComponentProps) => void;
  getFieldProps: (bizAlias: string) => IComponentProps;
  setFieldProps: (bizAlias: string, props: IComponentProps) => void;
  getSuiteChildren: () => any;
  setSuiteChildren: (children: any[]) => void;
  getMicroAppStatus: (appId?: number) => number;
  openMicroApp: (url: string, appId?: number) => number;
  spi: {
    getSuiteDesignData: <T>() => Promise<T>;
  }
}