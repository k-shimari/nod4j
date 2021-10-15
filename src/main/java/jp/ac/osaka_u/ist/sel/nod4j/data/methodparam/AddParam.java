package jp.ac.osaka_u.ist.sel.nod4j.data.methodparam;

import com.github.javaparser.StaticJavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.ClassOrInterfaceDeclaration;
import com.github.javaparser.ast.body.ConstructorDeclaration;
import com.github.javaparser.ast.body.MethodDeclaration;
import com.github.javaparser.ast.body.Parameter;
import com.github.javaparser.ast.expr.ObjectCreationExpr;
import com.github.javaparser.ast.visitor.VoidVisitorAdapter;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

/**
 * Get argument values
 *
 * @author k-simari
 */
public class AddParam {
    /**
     * This function returns the information of the method parameters in the specified file.
     *
     * @param f path + filename (e.g., src/main/filename.java)
     */
    public List<ParamInfo> getParamInfo(File f) {
        try {
            CompilationUnit unit = StaticJavaParser.parse(f);
            MethodParamVisitor v = new MethodParamVisitor();
            unit.accept(v, new CM());

            return new ArrayList<>(v.methodParams);
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public class MethodParamVisitor extends VoidVisitorAdapter<CM> {

        private List<ParamInfo> methodParams = new ArrayList<>();

        @Override
        public void visit(ClassOrInterfaceDeclaration n, CM arg) {
            arg.currentClassName.push(n.getNameAsString());
            // System.out.println("C " + arg);
            super.visit(n, arg);
            arg.currentClassName.pop();
        }

        @Override
        public void visit(MethodDeclaration n, CM arg) {
            arg.currentMethodName = n.getNameAsString();
            // System.out.println("M " + arg);
            for (Parameter p :n.getParameters()){
                methodParams.add(new ParamInfo(n.getNameAsString(), p.getNameAsString(), p.getTypeAsString(), p.getBegin().get().line));
                System.out.println(p.getNameAsString() + " " + p.getBegin().get().line);
            }
            super.visit(n, arg);
            arg.currentMethodName = "";
        }

        @Override
        public void visit(ConstructorDeclaration n, CM arg) {
            arg.currentMethodName = "<init>";
            // System.out.println("m " + arg);
            super.visit(n, arg);
            arg.currentMethodName = "";
        }

        @Override
        public void visit(ObjectCreationExpr n, CM arg) {
            if (n.getAnonymousClassBody().isPresent()) {
                arg.currentClassName.push(Integer.toString(arg.anonymous++));
                // System.out.println("A " + arg);
                super.visit(n, arg);
                arg.currentClassName.pop();
            } else {
                super.visit(n, arg);
            }
        }
    }

    private class CM {
        String currentMethodName = "";
        Stack<String> currentClassName = new Stack<>();
        int anonymous = 1;

        @Override
        public String toString() {
            return String.join("$", currentClassName) + ' ' + currentMethodName;
        }
    }
}
