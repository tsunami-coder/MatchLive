//
//  ReactVC.m
//  BookSearch
//
//  Created by tsunamier on 16/5/27.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ReactVC.h"
#import "RCTRootView.h"
@interface ReactVC ()

@end

@implementation ReactVC

- (void)viewDidLoad {
    [super viewDidLoad];
  
  [self.view setBackgroundColor:[UIColor whiteColor]];
  
  
  
  UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
  [button setFrame:CGRectMake(20, 30, 60, 30)];
  [self.view addSubview:button];
  
  [button setBackgroundColor:[UIColor redColor]];
  [button addTarget:self action:@selector(popVC) forControlEvents:UIControlEventTouchUpInside];
  
  
  
//  __block NSString * urlStr = @"http://172.16.20.178:8080/test/main.jsbundle";
//  
//  //使用gcd异步下载图片
//  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^(void){
//    //request
//    NSURL *url = [NSURL URLWithString:urlStr];
//    NSMutableURLRequest * request = [NSMutableURLRequest requestWithURL:url];
//    [request setHTTPMethod:@"GET"];
//    NSError * dataError = nil;
//    
//    NSData *data = [NSURLConnection sendSynchronousRequest:request returningResponse:nil error:&dataError];
//    
//    UIAlertView *alert =     [[UIAlertView alloc]initWithTitle:@"shahe" message:dataError.description delegate:self cancelButtonTitle:@"cancle" otherButtonTitles:@"confirm", nil];
//    [alert show];
//    
//    //下载成功之后将图片更新和缓存图片
//    if (data ) {
//      
//     
//      dispatch_async(dispatch_get_main_queue(), ^{
//        
//        NSArray *pathcaches=NSSearchPathForDirectoriesInDomains(NSCachesDirectory
//                                                                , NSUserDomainMask
//                                                                , YES);
//        NSString* cacheDirectory  = [pathcaches objectAtIndex:0];
//        
//        NSString *path = [cacheDirectory stringByAppendingPathComponent:@"main.jsbundle"];
//       BOOL success = [data writeToFile:path atomically:YES];
//        
//        
//  
//                          
//        NSURL *jsCodeLocation;
//        jsCodeLocation = [NSURL URLWithString:path];
//        
//        RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
//                                                            moduleName:@"BookSearch"
//                                                     initialProperties:nil
//                                                         launchOptions:nil];
//        CGSize size = self.view.bounds.size;
//        [rootView setFrame:CGRectMake(0,0,size.width, size.height)];
//        
//        [self.view addSubview:rootView];
//        
//        
//        
//        
//        
//        
//      });
//      
//    } else {
//      
//      return ;
//    }
//  });

  
  BOOL flag = 1;
  
    NSURL *jsCodeLocation;
  
  if (flag) {
    
    jsCodeLocation = [[NSBundle mainBundle]  URLForResource:@"main" withExtension:@"jsbundle"];
    
  }else{
    
     jsCodeLocation = [NSURL URLWithString:[NSString stringWithFormat:@"http://localhost:8081/index.ios.bundle"]];
  }

  
  
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"BookSearch"
                                               initialProperties:nil
                                                   launchOptions:nil];
  CGSize size = self.view.bounds.size;
  [rootView setFrame:CGRectMake(0,0,size.width, size.height)];
  
  [self.view addSubview:rootView];
  

    // Do any additional setup after loading the view.
}

-(void)popVC{

  [self.navigationController popViewControllerAnimated:YES];

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
