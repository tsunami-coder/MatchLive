//
//  RootViewController.m
//  BookSearch
//
//  Created by tsunamier on 16/5/27.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RootViewController.h"
#import "ReactVC.h"
@interface RootViewController ()

@end

@implementation RootViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  
  [self.view setBackgroundColor:[UIColor whiteColor]];
  
  UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
  [button setFrame:CGRectMake(100, 100, 100, 30)];
  [self.view addSubview:button];
  
  [button setBackgroundColor:[UIColor redColor]];
  [button addTarget:self action:@selector(pushReactView) forControlEvents:UIControlEventTouchUpInside];
  
  
    // Do any additional setup after loading the view.
}

-(void)pushReactView{
  ReactVC *reactVC = [[ReactVC alloc]init];
  [self.navigationController pushViewController:reactVC animated:YES];
  
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
