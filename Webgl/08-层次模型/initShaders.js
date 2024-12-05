function loaderShader(gl, type, source){
    /**
     * gl.createShader(type) 创建由type指定的着色器对象
     *  type可选值：
     *      1. gl.VERTEX_SHADER表示顶点着色器
     *      2. gl.FRAGMENT_SHADER表示片元着色器
     * gl.deleteShader(shader) 删除shader指定的着色器对象
     *  注意：如果着色器对象还在使用（也就是说已经使用gl.attachShader()函数使之附加在了程序对象上），那么deleteShader()函数并不会
     *  立刻删除着色器，而是要等到程序对象不再使用着色器后，才将其删除
     */
    const shader = gl.createShader(type);

    /**
     * gl.shaderSource(shader, source) 将source指定的字符串形式的代码传入shader指定的着色器。如果之前已经向shader传入过代码了，
     * 旧的代码将会被替换掉
     */
    gl.shaderSource(shader, source);

    /**
     * gl.compileShader(shader) 编译shader指定的着色器中的源代码
     *  注意：如果你通过调用gl.shaderSource()，用新的代码替换掉了着色器中旧的代码，WebGL系统中的用旧的代码编译出的可执行部分不会被
     *  自动替换，你需要手动地重新进行编译
     */
    gl.compileShader(shader);

    // 当调用gl.compileShader()函数时，如果着色器源代码中存在错误，那么就会出现编译错误。可以通过调用gl.getShaderParameter()函数
    // 并将参数pname指定为gl.COMPILE_STATUS，来检查着色器编译是否成功
    /**
     * gl.getShaderParameter(shader, pname) 获取shader指定的着色器中，pname指定的参数信息
     *  参数：
     *      shader：指定待获取参数的着色器
     *      pname：指定待获取参数的类型，可以是gl.SHADER_TYPE、gl.DELETE_STATUS或者gl.COMPILE_STATUS
     *  返回值（根据pname的不同，返回不同的值）：
     *      gl.SHADER_TYPE：返回是顶点着色器还是片元着色器
     *      gl.DELETE_STATUS：返回着色器是否被删除成功
     *      gl.COMPILE_STATUS：返回着色器是否被编译成功
     */
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(!compiled){
        // 如果编译失败，gl.getShaderParameter()会返回false，WebGL系统会把编译错误的具体内容写入着色器的信息日志，我们可以通过调用
        // gl.getShaderInfoLog()函数来获取之
        /**
         * gl.getShaderInfoLog(shader) 获取shader指定的着色器的信息日志
         */
        const error = gl.getShaderInfoLog(shader);
        console.log('Failed to compile shader: ' + error);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function createProgram(gl, vshader, fshader){
    const vertexShader = loaderShader(gl, gl.VERTEX_SHADER, vshader);
    const fragmentShader = loaderShader(gl, gl.FRAGMENT_SHADER, fshader);

    /**
     * gl.createProgram() 创建程序对象
     * gl.deleteProgram(program) 删除program指定的程序对象，如果该程序对象正在被使用，则不立即删除，而是等它不再被使用后再删除
     */
    const program = gl.createProgram();

    // 一旦程序对象被创建之后，需要向程序对象附上两个着色器（顶点着色器和片元着色器）
    /**
     * gl.attachShader(program, shader) 将shader指定的着色器对象分配给program指定的程序对象
     *  注意：着色器在附给程序对象前，并不一定要为其指定源代码或进行编译，也就是说，把空的着色器附给程序对象也是可以的
     * gl.detachShader(program, shader) 取消shader指定的着色器对象对program指定的程序对象的分配
     */
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // 在为程序对象分配了两个着色器对象后，还需要将着色器（顶点着色器和片元着色器）连接起来
    /**
     * gl.linkProgram(program) 连接program指定的程序对象中的着色器
     *  程序对象进行着色器连接操作，目的是保证：(1)顶点着色器和片元着色器的varying变量同名同类型，且一一对应；(2)顶点着色器对每个varying
     *  变量赋了值；(3)顶点着色器和片元着色器中的同名uniform变量也是同类型的（无需一一对应，即某些uniform变量可以出现在一个着色器中而不
     *  出现在另一个中）；(4)着色器中的attribute变量、uniform变量和varying变量的个数没有超过着色器的上限，等等。
     */
    gl.linkProgram(program);

    // 在着色器连接之后，可以通过调用gl.getProgramParameter()函数来检查是否连接成功
    /**
     * gl.getProgramParameter(program, pname) 获取program指定的程序对象中pname指定的参数信息
     *  参数：
     *      program：指定程序对象
     *      pname：指定待获取参数的类型，可以是：gl.DELETE_STATUS、gl.LINK_STATUS、gl.VALIDATE_STATUS、gl.ATTACHED_SHADERS、
     *      gl.ACTIVE_ATTRIBUTES或gl.ACTIVE_UNIFORMS
     *  返回值（根据pname的不同，返回不同的值）：
     *      gl.DELETE_STATUS：程序对象是否已被删除
     *      gl.LINK_STATUS：程序对象是否已经成功连接
     *      gl.VALIDATE_STATUS：程序对象是否已经通过验证
     *      gl.ATTACHED_SHADERS：已被分配给程序对象的着色器数量
     *      gl.ACTIVE_ATTRIBUTES：顶点着色器中attribute变量的数量
     *      gl.ACTIVE_UNIFORMS：程序对象中uniform变量的数量
     */
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(!linked){
        // 如果程序已经成功连接，我们就得到了一个二进制的可执行模块供WebGL系统使用。如果连接失败了，也可以通过调用gl.getProgramInfoLog()
        // 函数从信息日志中获取连接出错的信息
        /**
         * gl.getProgramInfoLog(program) 获取program指定的程序对象的信息日志
         */
        const error = gl.getProgramInfoLog(program);
        console.log('Failed to link program: ' + error);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return null;
    }

    return program;
}

function initShaders(gl, vshader, fshader){
    const program = createProgram(gl, vshader, fshader);

    /**
     * gl.useProgram(program) 告知WebGL系统绘制时使用program指定的程序对象
     *  这个函数的存在使得WebGL具有了一个强大的特性，那就是在绘制前准备多个程序对象，然后在绘制的时候根据需要切换程序对象
     */
    gl.useProgram(program);

    // 将程序对象设为gl对象的program属性
    gl.program = program;

    return true;
}