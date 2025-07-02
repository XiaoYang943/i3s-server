export interface DataSourceFileItem {
    path: string;   // 文件路径
    alias: string;  // 别名描述
}

export interface DataSourceFile {
    [key: string]: DataSourceFileItem;
}

export interface DataSource {
    file: DataSourceFile;
}

export interface Config {
    listen_port: number;    // 服务监听端口
    base_path: string;           // 服务前缀路径
    datasource: DataSource;
}
