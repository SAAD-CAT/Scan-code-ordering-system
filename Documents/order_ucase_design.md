# Order Usecase design


## 一、
### 用例简介

- Boundary：与外部 Actor 交互的类。包括 UI、外部系统接口
> ScanCode: 扫二维码
> FillCart: 编辑购物车
> MakeOrder: 填写订单
> Pay: 支付

- Controller：处理外部事件，实现控制流的类。通常是一个子系统、一个用例一个类
> OrderingControl: 扫码点餐系统

- Entity：领域对象或数据实体
> Dishes: 菜品
> DishesList: 菜单
> Order: 订单

### 顺序图
![](https://raw.githubusercontent.com/SAAD-CAT/Scan-code-ordering-system/master/Assets/Images/ucase1_seq.png)

### 类图
![](https://raw.githubusercontent.com/SAAD-CAT/Scan-code-ordering-system/master/Assets/Images/ucase1_class.png)



