import os

def rename_files_numerically(folder_path):
    """
    将文件夹内的文件按数字顺序重命名（1.ext, 2.ext, 3.ext...）
    
    参数:
        folder_path (str): 目标文件夹路径
    """
    # 获取文件夹内所有文件（排除子文件夹）
    files = [f for f in os.listdir(folder_path) 
             if os.path.isfile(os.path.join(folder_path, f))]
    
    # 按文件名排序（自然排序：1, 2, 10 而不是 1, 10, 2）
    files.sort(key=lambda x: [int(c) if c.isdigit() else c for c in re.split('([0-9]+)', x)])
    
    # 重命名文件
    for i, filename in enumerate(files, start=1):
        # 获取文件扩展名
        ext = os.path.splitext(filename)[1]
        
        # 新文件名（数字 + 原扩展名）
        new_name = f"{i}{ext}"
        
        # 原始文件完整路径
        old_path = os.path.join(folder_path, filename)
        new_path = os.path.join(folder_path, new_name)
        
        # 避免覆盖已存在的文件
        while os.path.exists(new_path):
            i += 1
            new_name = f"{i}{ext}"
            new_path = os.path.join(folder_path, new_name)
        
        # 重命名
        os.rename(old_path, new_path)
        print(f"Renamed: {filename} -> {new_name}")

if __name__ == "__main__":
    import re
    
    # 用户输入目标文件夹路径
    target_folder = input("请输入文件夹路径: ").strip()
    
    # 验证路径是否存在
    if not os.path.isdir(target_folder):
        print("错误：路径无效或不是文件夹")
    else:
        rename_files_numerically(target_folder)
        print("重命名完成！")