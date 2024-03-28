
namespace Building
{
    class Program
    {
        //print the triangle
        static void printTriangle(int width, int height)
        {
            //validation to print
            if (width % 2 == 0 || width > height * 2)
                Console.WriteLine("Imposible to print");
            else
            {
                int line = height - 1, space = width / 2, star = 1;//initialize the number of the stars, space, and lines int the print
                int num = (height - 2) / ((width-2) / 2);//the number of times that every line should be
                bool firstLine = true;
                while (line > 0)
                {
                    for (int j = num; j > 0; j--)
                    {
                        for (int i = space; i > 0; i--)//print the space
                            Console.Write(" ");
                        for (int i = star; i > 0; i--)//print the stars
                            Console.Write("*");
                        if (star == 1 || star == width)//in the first and last lines the program should print one line
                        {
                            Console.WriteLine();
                            break;
                        }
                        if(firstLine)//add the extra lines if the devision isn't equall
                        {
                            j += height - 2 - (num * ((width - 2) / 2));//extend the iteration
                            firstLine = false;
                        }
                        Console.WriteLine();
                    }
                    if(star == width) //
                        line = 0;//finish the itaration
                    space--;//space reduction
                    star += 2;//adding asterisks
                }
            }
        }

        static void Main()
        {
            int height, width;
            Console.WriteLine(" Tap 1 to create a rectangle\n Tap 2 to create a triangle\n Tap 3 to exit");
            int choice = int.Parse(Console.ReadLine()!);
            while (choice != 3)
            {
                try
                {
                    Console.WriteLine("Enter the height and width of the building");
                    height = int.Parse(Console.ReadLine()!);
                    width = int.Parse(Console.ReadLine()!);

                    switch (choice)
                    {
                        case 1://rectangle
                            {
                                if (height == width || width - height > 5 || height - width > 5)
                                    Console.WriteLine("The area is {0}", width * height);//print the area
                                else
                                    Console.WriteLine("The perimeter is {0}", width * 2 + height * 2);//print the perimeter
                                break;
                            }
                        case 2://triangle
                            {
                                Console.WriteLine(" Tap 1 to perimeter\n Tap 2 to print the building");//let the user choose - print or perimeter
                                int triangleChoice = int.Parse(Console.ReadLine()!);
                                if (triangleChoice == 1)
                                    Console.WriteLine("The perimeter is {0}", Math.Sqrt(height * width / 2) * 2 + width);//calculate the perimeter of the triangle
                                else if(triangleChoice == 2)
                                    printTriangle(width, height);//function to print the triangle
                                else
                                    Console.WriteLine("wrong input");
                                break;
                            }
                        default:
                            break;
                    }
                    //continue until the user exit the program
                    Console.WriteLine(" Tap 1 to create a rectangle\n Tap 2 to create a triangle\n Tap 3 to exit");
                    choice = int.Parse(Console.ReadLine()!);
                }
                catch
                {
                    Console.WriteLine("Something went wrong");//print exception
                    choice = 3;//exit the program
                }
            }
        }
    }
}

